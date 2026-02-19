const db = require("../database/connection");

class Request {
  static async create({
    id,
    user_id,
    type,
    description,
    unit,
    address,
    priority,
    status,
  }) {
    await db.run(
      `
      INSERT INTO maintenance_requests (
        id, user_id, type, description, unit, address, priority, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))
    `,
      [id, user_id, type, description, unit, address, priority, status]
    );

    return this.findById(id);
  }

  static async findById(id) {
    const request = await db.get(
      "SELECT * FROM maintenance_requests WHERE id = ?",
      [id]
    );

    if (request) {
      // Get associated messages
      request.messages = await db.all(
        "SELECT * FROM messages WHERE request_id = ? ORDER BY created_at ASC",
        [id]
      );
    }

    return request;
  }

  static async findAll(filters = {}) {
    let query = "SELECT * FROM maintenance_requests WHERE 1=1";
    const params = [];

    if (filters.user_id) {
      query += " AND user_id = ?";
      params.push(filters.user_id);
    }

    if (filters.status) {
      query += " AND status = ?";
      params.push(filters.status);
    }

    if (filters.type) {
      query += " AND type = ?";
      params.push(filters.type);
    }

    if (filters.priority) {
      query += " AND priority = ?";
      params.push(filters.priority);
    }

    query += " ORDER BY created_at DESC";

    const requests = await db.all(query, params);

    // Get messages for each request
    for (const request of requests) {
      request.messages = await db.all(
        "SELECT * FROM messages WHERE request_id = ? ORDER BY created_at ASC",
        [request.id]
      );
    }

    return requests;
  }

  static async update(id, data) {
    const fields = [];
    const values = [];

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    });

    if (fields.length === 0) return this.findById(id);

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    await db.run(
      `UPDATE maintenance_requests SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id) {
    // Delete associated messages first
    await db.run("DELETE FROM messages WHERE request_id = ?", [id]);
    // Delete request
    await db.run("DELETE FROM maintenance_requests WHERE id = ?", [id]);
    return true;
  }

  static async getStats() {
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM maintenance_requests
    `);

    return stats;
  }
}

module.exports = Request;

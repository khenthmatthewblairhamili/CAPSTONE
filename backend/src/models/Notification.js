const db = require("../database/connection");

class Notification {
  static async create({ user_id, type, title, message }) {
    const result = await db.run(
      `
      INSERT INTO notifications (user_id, type, title, message, created_at)
      VALUES (?, ?, ?, ?, datetime('now', 'localtime'))
    `,
      [user_id, type, title, message]
    );

    return this.findById(result.id);
  }

  static async findById(id) {
    return await db.get("SELECT * FROM notifications WHERE id = ?", [id]);
  }

  static async findByUserId(user_id, filters = {}) {
    let query = "SELECT * FROM notifications WHERE user_id = ?";
    const params = [user_id];

    if (filters.is_read !== undefined) {
      query += " AND is_read = ?";
      params.push(filters.is_read ? 1 : 0);
    }

    query += " ORDER BY created_at DESC";

    return await db.all(query, params);
  }

  static async markAsRead(id) {
    await db.run("UPDATE notifications SET is_read = 1 WHERE id = ?", [id]);
    return this.findById(id);
  }

  static async markAllAsRead(user_id) {
    await db.run("UPDATE notifications SET is_read = 1 WHERE user_id = ?", [
      user_id,
    ]);
    return true;
  }

  static async delete(id) {
    await db.run("DELETE FROM notifications WHERE id = ?", [id]);
    return true;
  }

  static async getUnreadCount(user_id) {
    const result = await db.get(
      "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0",
      [user_id]
    );
    return result.count;
  }
}

module.exports = Notification;

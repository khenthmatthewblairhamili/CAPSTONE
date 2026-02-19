const db = require("../database/connection");

class User {
  static async create({
    email,
    password,
    name,
    role,
    phone,
    address,
    position,
    community,
    profile_image,
  }) {
    const result = await db.run(
      `
      INSERT INTO users (email, password, name, role, phone, address, position, community, profile_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        email,
        password,
        name,
        role,
        phone,
        address,
        position,
        community,
        profile_image,
      ]
    );

    return this.findById(result.id);
  }

  static async findById(id) {
    return await db.get("SELECT * FROM users WHERE id = ?", [id]);
  }

  static async findByEmail(email) {
    return await db.get("SELECT * FROM users WHERE email = ?", [email]);
  }

  static async findAll(filters = {}) {
    let query = "SELECT * FROM users WHERE 1=1";
    const params = [];

    if (filters.role) {
      query += " AND role = ?";
      params.push(filters.role);
    }

    return await db.all(query, params);
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

    await db.run(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);

    return this.findById(id);
  }

  static async delete(id) {
    await db.run("DELETE FROM users WHERE id = ?", [id]);
    return true;
  }
}

module.exports = User;

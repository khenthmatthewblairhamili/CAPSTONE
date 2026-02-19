const db = require("./connection");

const createTables = async () => {
  try {
    await db.connect();

    // Users table
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'homeowner')),
        phone TEXT,
        address TEXT,
        position TEXT,
        community TEXT,
        profile_image TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Maintenance requests table
    await db.run(`
      CREATE TABLE IF NOT EXISTS maintenance_requests (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        unit TEXT NOT NULL,
        address TEXT,
        priority TEXT NOT NULL CHECK(priority IN ('High', 'Medium', 'Low')),
        status TEXT NOT NULL CHECK(status IN ('pending', 'in-progress', 'completed')),
        assigned_technician TEXT,
        technician_notes TEXT,
        completion_notes TEXT,
        completed_date DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Messages table
    await db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id TEXT NOT NULL,
        sender TEXT NOT NULL CHECK(sender IN ('admin', 'homeowner')),
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (request_id) REFERENCES maintenance_requests(id)
      )
    `);

    // Notifications table
    await db.run(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

if (require.main === module) {
  createTables()
    .then(() => {
      console.log("Migration completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}

module.exports = createTables;

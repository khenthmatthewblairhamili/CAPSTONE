const bcrypt = require("bcryptjs");
const db = require("./connection");

const seedData = async () => {
  try {
    await db.connect();

    // Check if data already exists
    const existingUser = await db.get("SELECT id FROM users LIMIT 1");
    if (existingUser) {
      console.log("Database already seeded. Skipping...");
      console.log(
        "To reseed, delete the database file and run migration again."
      );
      return;
    }

    console.log("Seeding database with initial data...");

    // Hash passwords
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Seed admin user
    await db.run(
      `
      INSERT INTO users (email, password, name, role, phone, position, community, profile_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        "admin@camella.com",
        hashedPassword,
        "Juan Dela Cruz",
        "admin",
        "+63 912 345 6789",
        "Property Manager",
        "Camella Homes",
        "https://api.dicebear.com/7.x/avataaars/png?seed=Juan",
      ]
    );

    // Seed homeowner users
    await db.run(
      `
      INSERT INTO users (email, password, name, role, phone, address, profile_image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        "homeowner@camella.com",
        hashedPassword,
        "Maria Santos",
        "homeowner",
        "+63 917 234 5678",
        "Block 5, Lot 12, Camella Homes",
        "https://api.dicebear.com/7.x/avataaars/png?seed=Maria",
      ]
    );

    // Get user IDs
    const admin = await db.get("SELECT id FROM users WHERE email = ?", [
      "admin@camella.com",
    ]);
    const homeowner = await db.get("SELECT id FROM users WHERE email = ?", [
      "homeowner@camella.com",
    ]);

    // Seed maintenance requests
    const requests = [
      {
        id: "REQ-001",
        user_id: homeowner.id,
        type: "Plumbing",
        description: "Leaking pipe in the kitchen sink",
        unit: "Block 5 Lot 12",
        address: "Block 5, Lot 12, Camella Homes",
        priority: "High",
        status: "in-progress",
        assigned_technician: "John Smith",
      },
      {
        id: "REQ-002",
        user_id: homeowner.id,
        type: "Electrical",
        description: "Flickering lights in living room",
        unit: "Block 5 Lot 12",
        address: "Block 5, Lot 12, Camella Homes",
        priority: "Medium",
        status: "pending",
        assigned_technician: null,
      },
      {
        id: "REQ-003",
        user_id: homeowner.id,
        type: "HVAC",
        description: "Air conditioning not cooling properly",
        unit: "Block 5 Lot 12",
        address: "Block 5, Lot 12, Camella Homes",
        priority: "High",
        status: "completed",
        assigned_technician: "Mike Johnson",
        technician_notes: "Replaced air filter and refrigerant",
        completion_notes: "AC is working efficiently now",
        completed_date: new Date("2024-01-15").toISOString(),
      },
    ];

    for (const req of requests) {
      await db.run(
        `
        INSERT INTO maintenance_requests (
          id, user_id, type, description, unit, address, priority, 
          status, assigned_technician, technician_notes, completion_notes, completed_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          req.id,
          req.user_id,
          req.type,
          req.description,
          req.unit,
          req.address,
          req.priority,
          req.status,
          req.assigned_technician,
          req.technician_notes || null,
          req.completion_notes || null,
          req.completed_date || null,
        ]
      );
    }

    // Messages and notifications removed from seed data

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

if (require.main === module) {
  seedData()
    .then(() => {
      console.log("Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

module.exports = seedData;

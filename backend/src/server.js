require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database/connection");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/requests");
const messageRoutes = require("./routes/messages");
const notificationRoutes = require("./routes/notifications");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root route - API documentation
app.get("/", (req, res) => {
  res.json({
    message: "Maintenance Request System API",
    version: "1.0.0",
    endpoints: {
      auth: {
        login: "POST /api/auth/login",
        register: "POST /api/auth/register",
        profile: "GET /api/auth/me",
        updateProfile: "PUT /api/auth/profile",
        changePassword: "PUT /api/auth/password",
      },
      requests: {
        create: "POST /api/requests",
        getAll: "GET /api/requests",
        getById: "GET /api/requests/:id",
        update: "PUT /api/requests/:id",
        delete: "DELETE /api/requests/:id",
        stats: "GET /api/requests/stats/summary",
      },
      messages: {
        create: "POST /api/messages",
        getByRequest: "GET /api/messages/request/:request_id",
      },
      notifications: {
        getAll: "GET /api/notifications",
        unreadCount: "GET /api/notifications/unread/count",
        markAsRead: "PUT /api/notifications/:id/read",
        markAllRead: "PUT /api/notifications/read-all",
        delete: "DELETE /api/notifications/:id",
      },
    },
    health: "GET /health",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler (must be last)
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    await db.connect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing server...");
  await db.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, closing server...");
  await db.close();
  process.exit(0);
});

startServer();

module.exports = app;

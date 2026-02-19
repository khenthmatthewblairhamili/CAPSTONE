const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authMiddleware } = require("../middleware/auth");
const { notificationValidation } = require("../middleware/validator");

// All routes require authentication
router.use(authMiddleware);

// Get all notifications for current user
router.get("/", notificationController.getAll);

// Get unread count
router.get("/unread/count", notificationController.getUnreadCount);

// Mark notification as read
router.put(
  "/:id/read",
  notificationValidation.getId,
  notificationController.markAsRead
);

// Mark all as read
router.put("/read-all", notificationController.markAllAsRead);

// Delete notification
router.delete(
  "/:id",
  notificationValidation.getId,
  notificationController.delete
);

module.exports = router;

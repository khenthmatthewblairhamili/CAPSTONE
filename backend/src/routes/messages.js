const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { authMiddleware } = require("../middleware/auth");
const { messageValidation } = require("../middleware/validator");

// All routes require authentication
router.use(authMiddleware);

// Create message
router.post("/", messageValidation.create, messageController.create);

// Get messages by request ID
router.get(
  "/request/:request_id",
  messageValidation.getByRequestId,
  messageController.getByRequestId
);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/auth");
const { authValidation } = require("../middleware/validator");

// Public routes
router.post("/register", authValidation.register, authController.register);
router.post("/login", authValidation.login, authController.login);

// Protected routes
router.get("/me", authMiddleware, authController.getCurrentUser);
router.put(
  "/profile",
  authMiddleware,
  authValidation.updateProfile,
  authController.updateProfile
);
router.put(
  "/password",
  authMiddleware,
  authValidation.changePassword,
  authController.changePassword
);

module.exports = router;

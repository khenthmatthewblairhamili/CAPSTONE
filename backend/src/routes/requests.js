const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const { authMiddleware, requireAdmin } = require("../middleware/auth");
const { requestValidation } = require("../middleware/validator");

// All routes require authentication
router.use(authMiddleware);

// Create request (homeowners only)
router.post("/", requestValidation.create, requestController.create);

// Get all requests (filtered by role)
router.get("/", requestController.getAll);

// Get request by ID
router.get("/:id", requestValidation.getId, requestController.getById);

// Update request (admins only)
router.put(
  "/:id",
  requireAdmin,
  requestValidation.update,
  requestController.update
);

// Delete request
router.delete("/:id", requestValidation.getId, requestController.delete);

// Get stats (admins only)
router.get("/stats/summary", requireAdmin, requestController.getStats);

module.exports = router;

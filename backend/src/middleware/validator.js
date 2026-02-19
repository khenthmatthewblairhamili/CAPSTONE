const { body, param, query, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const authValidation = {
  register: [
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("name").notEmpty().withMessage("Name is required"),
    body("role")
      .isIn(["admin", "homeowner"])
      .withMessage("Role must be admin or homeowner"),
    validate,
  ],

  login: [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
    validate,
  ],

  updateProfile: [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("phone")
      .optional()
      .matches(/^\+?[0-9\s-]+$/)
      .withMessage("Invalid phone format"),
    validate,
  ],

  changePassword: [
    body("currentPassword").notEmpty().withMessage("Current password required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    validate,
  ],
};

const requestValidation = {
  create: [
    body("type").notEmpty().withMessage("Type is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("unit").notEmpty().withMessage("Unit is required"),
    body("address").optional(),
    validate,
  ],

  update: [
    body("priority")
      .optional()
      .isIn(["High", "Medium", "Low"])
      .withMessage("Invalid priority"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status"),
    validate,
  ],

  getId: [param("id").notEmpty().withMessage("Request ID required"), validate],
};

const messageValidation = {
  create: [
    body("request_id").notEmpty().withMessage("Request ID required"),
    body("message").notEmpty().withMessage("Message cannot be empty"),
    validate,
  ],

  getByRequestId: [
    param("request_id").notEmpty().withMessage("Request ID required"),
    validate,
  ],
};

const notificationValidation = {
  getId: [
    param("id").isInt().withMessage("Valid notification ID required"),
    validate,
  ],
};

module.exports = {
  authValidation,
  requestValidation,
  messageValidation,
  notificationValidation,
};

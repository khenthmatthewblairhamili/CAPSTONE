const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // SQLite errors
  if (err.code === "SQLITE_CONSTRAINT") {
    return res.status(400).json({
      error: "Database constraint violation",
      details: err.message,
    });
  }

  // Validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: err.message,
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
};

module.exports = errorHandler;

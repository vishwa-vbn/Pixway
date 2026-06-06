function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.code || "UNKNOWN"}: ${err.message}`);

  const statusMap = {
    MISSING_FIELDS: 400,
    INVALID_FILE_TYPE: 400,
    FILE_TOO_LARGE: 400,
    IMAGEKIT_ERROR: 502,
    INTERNAL_ERROR: 500,
  };

  // Handle Multer-specific errors
  if (err.code === "LIMIT_FILE_SIZE") {
    err.code = "FILE_TOO_LARGE";
    err.message = `File exceeds the ${process.env.MAX_FILE_SIZE_MB || 10}MB limit`;
  }

  const status = err.status || statusMap[err.code] || 500;
  const code = err.code || "INTERNAL_ERROR";

  res.status(status).json({
    success: false,
    error: {
      code,
      message: err.message || "An unexpected error occurred",
    },
  });
}

module.exports = errorHandler;

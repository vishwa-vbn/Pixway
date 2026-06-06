const multer = require("multer");

const MAX_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || "10", 10);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SIZE_MB * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      const err = new Error("Only image files are allowed");
      err.code = "INVALID_FILE_TYPE";
      return cb(err, false);
    }
    cb(null, true);
  },
});

module.exports = upload;

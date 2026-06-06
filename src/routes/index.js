const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { handleUpload, handleDelete } = require("../controllers/uploadController");

// Health check
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "UniUpload",
    timestamp: new Date().toISOString(),
  });
});

// Image upload
router.post("/upload", upload.single("image"), handleUpload);

// Image delete
router.delete("/uploads/:imageKitId", handleDelete);

module.exports = router;

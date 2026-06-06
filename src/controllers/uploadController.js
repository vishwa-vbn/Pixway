const { uploadImage } = require("../services/imagekitService");

async function handleUpload(req, res, next) {
  try {
    const { applicationName, applicationId } = req.body;
    const file = req.file;

    // Validate required fields
    if (!applicationName || !applicationId || !file) {
      const err = new Error("applicationName, applicationId, and image are required");
      err.code = "MISSING_FIELDS";
      err.status = 400;
      return next(err);
    }

    const data = await uploadImage(
      file.buffer,
      file.originalname,
      applicationName,
      applicationId
    );

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleUpload };

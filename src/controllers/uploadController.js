const { uploadImage, deleteImage } = require("../services/imagekitService");

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

async function handleDelete(req, res, next) {
  try {
    const { imageKitId } = req.params;
    const { applicationName, applicationId } = req.body;

    // Validate required fields
    if (!applicationName || !applicationId || !imageKitId) {
      const err = new Error("applicationName, applicationId, and imageKitId are required");
      err.code = "MISSING_FIELDS";
      err.status = 400;
      return next(err);
    }

    await deleteImage(imageKitId);

    res.status(200).json({ success: true, message: "Image deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleUpload, handleDelete };

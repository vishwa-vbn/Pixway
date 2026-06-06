const imagekit = require("../config/imagekit");

/**
 * Uploads a file buffer to ImageKit.
 * @param {Buffer} fileBuffer
 * @param {string} fileName
 * @param {string} applicationName
 * @param {string} applicationId
 * @returns {Object} Structured upload result
 */
async function uploadImage(fileBuffer, fileName, applicationName, applicationId) {
  let result;

  try {
    result = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: "/uniupload",
    });
  } catch (err) {
    const error = new Error(err.message || "ImageKit upload failed");
    error.code = "IMAGEKIT_ERROR";
    throw error;
  }

  const imageUrl = result.url;
  const imageKitId = result.fileId;

  // Tagged URL format: imageUrl|applicationName|applicationId|imageKitId
  const taggedUrl = `${imageUrl}|${applicationName}|${applicationId}|${imageKitId}`;

  return {
    applicationName,
    applicationId,
    imageUrl,
    imageKitId,
    taggedUrl,
  };
}

/**
 * Deletes an image from ImageKit.
 * @param {string} imageKitId
 * @returns {Object} Result of deletion
 */
async function deleteImage(imageKitId) {
  try {
    const result = await imagekit.deleteFile(imageKitId);
    return result;
  } catch (err) {
    const error = new Error(err.message || "ImageKit delete failed");
    error.code = "IMAGEKIT_ERROR";
    throw error;
  }
}

module.exports = { uploadImage, deleteImage };

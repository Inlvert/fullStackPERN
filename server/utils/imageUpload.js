const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "public", "picture"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const imageUpload = multer({ storage: imageStorage });

module.exports.imageUpload = imageUpload;
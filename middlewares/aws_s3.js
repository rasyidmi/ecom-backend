const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: "ap-southeast-2",
});

const uploadUserImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ecomapp-bucket",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      req.errorStatus = 0;
      const fileName = `user-images/${Date.now().toString()}${path.extname(
        file.originalname
      )}`;
      cb(null, fileName);
      console.log(`INFO: Object succesfully uploaded to S3 Bucket ${fileName}`);
    },
  }),
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    if (!checkFileIsImage(file)) {
      console.log("Error: Images only!");
      req.errorStatus = 1;
      cb(null);
      return;
    }
    cb(null, true);
  },
}).single("image");

const uploadProductImages = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ecomapp-bucket",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      req.errorStatus = 0;
      const fileName = `product-images/${req.body.id}/${Date.now().toString()}${path.extname(
        file.originalname
      )}`;
      cb(null, fileName);
      console.log(`INFO: Object succesfully uploaded to S3 Bucket ${fileName}`);
    },
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
      if (!checkFileIsImage(file)) {
        console.log("Error: Images only!");
        req.errorStatus = 1;
        cb(null);
        return;
      }
      cb(null, true);
    },
  }),
}).array("images");

function checkFileIsImage(file) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return true;
  } else {
    return false;
  }
}

exports.uploadUserImage = uploadUserImage;
exports.uploadProductImages = uploadProductImages;

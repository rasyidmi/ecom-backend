const express = require("express");
const router = express.Router();

const { uploadProductImages } = require("../../middlewares/aws_s3");
const { loginAauth, sellerAuth } = require("../../middlewares/auth");
const ProductController = require("../controllers/product_controller");

router.post("/upload-images", loginAauth, sellerAuth, uploadProductImages, ProductController.uploadImages);

module.exports = router;

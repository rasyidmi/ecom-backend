const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user_controller");
const SellerController = require("../controllers/seller_controller");
const { apiKeyAuth, loginAauth } = require("../../middlewares/auth");
const { uploadUserImage } = require("../../middlewares/aws_s3");

router.use(express.json());
router.get("/confirm/:tokenId/:token", UserController.verifyEmail);
router.use(apiKeyAuth);
router.post("/login", UserController.login);
router.post("/register", uploadUserImage, UserController.register);
router.post("/seller/login", SellerController.sellerLogin);
router.post(
  "/seller/register",
  uploadUserImage,
  SellerController.sellerRegister
);
router.use(loginAauth);
router.put(
  "/user/update-image",
  uploadUserImage,
  UserController.updateUserImage
);
router.put(
  "/seller/update-image",
  uploadUserImage,
  SellerController.updateSellerImage
);

module.exports = router;

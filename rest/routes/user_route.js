const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user_controller");
const { apiKeyAuth } = require("../../middlewares/auth");

router.use(express.json());
router.get("/confirm/:tokenId/:token", UserController.verifyEmail);
router.use(apiKeyAuth);
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/seller/login", UserController.sellerLogin);
router.post("/seller/register", UserController.sellerRegister);

module.exports = router;

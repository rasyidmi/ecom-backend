const mongoose = require("mongoose");
const moment = require("moment");
var validator = require("validator");

const User = require("../../models/user");
const Seller = require("../../models/seller");
const VerifyEmailToken = require("../../models/verify_email_token");
const { encryptPassword, decryptPassword } = require("../../services/crpyto");
const jwt = require("../../services/jwt");
const { awsDeleteFile } = require("../../services/aws_s3");

class UserController {
  static async verifyEmail(req, res, next) {
    try {
      // Decrypt mail token.
      const token = req.params.token;
      const tokenId = req.params.tokenId;
      // Check expired or not
      const data = await VerifyEmailToken.findOne({
        token: token,
        _id: new mongoose.Types.ObjectId(tokenId),
      });
      if (!data) {
        return res.status(404).json({ message: "Data not found." });
      }
      if (moment().isAfter(data.expiredDate)) {
        return res.status(400).json({ message: "Token expired." });
      }
      // Try to get the user
      const user = await User.findOne({ email: data.email });
      if (user) {
        await User.updateOne(
          { email: data.email },
          { $set: { isVerified: true } }
        );
        return res
          .status(200)
          .json({ message: "Email verified, check your account." });
      }
      const seller = await Seller.findOne({ email: data.email });
      if (seller) {
        await Seller.updateOne(
          { email: data.email },
          { $set: { isVerified: true } }
        );
        return res
          .status(200)
          .json({ message: "Email verified, check your account." });
      }
      return res.status(404).json({ message: "User not found." });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const decryptedPassword = decryptPassword(user.password);
      if (password != decryptedPassword) {
        return res.status(400).json({ message: "Wrong password" });
      }
      // Create JWT.
      const token = jwt.signJwt({
        id: user._id,
        email: email,
        isSeller: false,
      });

      return res.status(200).json({
        message: "Success login.",
        data: { id: user._id, email: user.email, token: token },
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const imageLocation = req.file.location;

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email not valid" });
      }
      const existingUser = await User.findOne({ email: email });
      const existingSeller = await Seller.findOne({ email: email });
      if (existingUser || existingSeller) {
        return res.status(400).json({ message: "User is exist" });
      }

      const newUser = new User({
        name: name,
        email: email,
        image: imageLocation,
        password: encryptPassword(password),
      });
      const createdUser = await newUser.save();

      return res
        .status(201)
        .json({ message: "Success create account.", data: createdUser._doc });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserImage(req, res, next) {
    try {
      const imageLocation = req.file.location;
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found." });
      const imageUrl = user.image;
      if (imageUrl && imageUrl.length > 0)
        await awsDeleteFile(imageUrl, "user-images");
      user.image = imageLocation;
      await user.save();
      return res.status(200).json({ message: "Success update user image." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

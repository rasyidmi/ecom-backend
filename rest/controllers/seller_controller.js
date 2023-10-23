var validator = require("validator");

const User = require("../../models/user");
const Seller = require("../../models/seller");
const { decryptPassword } = require("../../services/crpyto");
const jwt = require("../../services/jwt");
const { awsDeleteFile } = require("../../services/aws_s3");

class SellerController {
  static async sellerRegister(req, res, next) {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const imageLocation = req.file.location;

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email not valid" });
      }
      const existingSeller = await Seller.findOne({ email: email });
      const existingUser = await User.findOne({ email: email });
      if (existingUser || existingSeller) {
        return res.status(400).json({ message: "User is exist" });
      }

      const newSeller = new Seller({
        name: name,
        email: email,
        image: imageLocation,
        password: encryptPassword(password),
      });
      const createdSeller = await newSeller.save();

      return res
        .status(201)
        .json({ message: "Success create account.", data: createdSeller._doc });
    } catch (error) {
      next(error);
    }
  }

  static async sellerLogin(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await Seller.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const decryptedPassword = decryptPassword(user.password);
      if (password != decryptedPassword) {
        return res.status(400).json({ message: "Wrong password" });
      }
      // Create JWT.
      const token = jwt.signJwt({ id: user._id, email: email });

      return res.status(200).json({
        message: "Success login.",
        data: { id: user._id, email: user.email, token: token },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSellerImage(req, res, next) {
    try {
      const imageLocation = req.file.location;
      const userId = req.user.id;
      const user = await Seller.findById(userId);
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

module.exports = SellerController;

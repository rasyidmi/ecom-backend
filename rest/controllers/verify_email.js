const mongoose = require("mongoose");
const moment = require("moment");

const User = require("../../models/user");
const Seller = require("../../models/seller");
const VerifyEmailToken = require("../../models/verify_email_token");

const verifyEmail = async (req, res, next) => {
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
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.verifyEmail = verifyEmail;

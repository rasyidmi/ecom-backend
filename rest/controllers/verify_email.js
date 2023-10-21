const User = require("../../models/user");
const Seller = require("../../models/seller");

const { decryptVerifyEmailToken } = require("../../services/crpyto");
const { verifyToken } = require("../../services/jwt");

const verifyEmailController = async (req, res, next) => {
  try {
    const authHeader = req.header("authorization");
    if (!authHeader) return res.status(401).json({ message: "No Token" });
    if (!authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Invalid Token" });

    const jwtToken = authHeader.substring(7, authHeader.length);
    const jwtPayload = verifyToken(jwtToken);
    if (!jwtPayload) return res.status(401).json({ message: "Invalid Token" });

    // Decrypt mail token.
    const emailToken = req.params.token;
    const token = decryptVerifyEmailToken(emailToken);
    const tokenPayload = verifyToken(token);
    if (!tokenPayload)
      return res.status(401).json({ message: "Token expired" });
    const email = tokenPayload.email;
    // Try to get the user
    const user = await User.findOne({ email: email });
    if (user) {
      await User.updateOne({ email: email }, { $set: { isVerified: true } });
      return res
        .status(200)
        .json({ message: "Email verified, check your account." });
    }
    const seller = await Seller.findOne({ email: email });
    if (seller) {
      await Seller.updateOne({ email: email }, { $set: { isVerified: true } });
      return res
        .status(200)
        .json({ message: "Email verified, check your account." });
    }
    return res.status(404).json({ message: "Email not found." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.module = verifyEmailController;

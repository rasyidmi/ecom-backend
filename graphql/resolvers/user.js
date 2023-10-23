const moment = require("moment");

const User = require("../../models/user");
const Seller = require("../../models/seller");
const VerifyEmailToken = require("../../models/verify_email_token");
const { generateToken } = require("../../services/crpyto");
const sendVerifyAccountEmail = require("../../services/mailjet");

class UserResolver {
  static getCurrentUserData = async (obj, args, context, info) => {
    const userId = args.user.id;
    let user;
    user = await User.findById(userId);
    if (!user) user = await Seller.findById(userId);
    if (!user) throw new Error("User not found.");

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      wallet: user.wallet,
      image: user.image,
      isVerifed: user.isVerified,
    };
  };

  static updateUser = async (obj, args, context, info) => {
    const userId = args.user.id;
    const data = obj.data;
    let user;
    user = await User.findById(userId);
    if (!user) user = await Seller.findById(userId);
    if (!user) throw new Error("User not found.");

    user.set(data);
    const updatedUser = await user.save();

    return {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      wallet: updatedUser.wallet,
      isVerifed: updatedUser.isVerified,
    };
  };

  static sendVerifyEmail = async (obj, args, context, info) => {
    const token = generateToken();
    const newDoc = new VerifyEmailToken({
      token: token,
      email: args.user.email,
      expiredDate: moment().add(10, "minutes"),
    });
    const createdDoc = await newDoc.save();

    // Send email
    const user = await User.findOne({ email: args.user.email });
    if (user) {
      sendVerifyAccountEmail(
        user.name,
        user.email,
        token,
        newDoc._id.toString()
      );
      return {
        email: createdDoc.email,
        expiredDate: createdDoc.expiredDate.toISOString(),
      };
    }
    const seller = await Seller.findOne({ email: args.user.email });
    sendVerifyAccountEmail(
      seller.name,
      seller.email,
      token,
      newDoc._id.toString()
    );
    return {
      email: createdDoc.email,
      expiredDate: createdDoc.expiredDate.toISOString(),
    };
  };

  static topUp = async (obj, args, context, info) => {
    const userId = args.user.id;
    const topUpAmount = obj.amount;
    let user;
    user = await User.findById(userId);
    if (!user) user = await Seller.findById(userId);
    if (!user) throw new Error("User not found.");
    // TODO: implement payment gateway
    user.wallet = user.wallet + topUpAmount;
    user = await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      wallet: user.wallet,
      isVerifed: user.isVerified,
    };
  };
}

module.exports = UserResolver;

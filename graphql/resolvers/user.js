const moment = require("moment");

const User = require("../../models/user");
const Seller = require("../../models/seller");
const VerifyEmailToken = require("../../models/verify_email_token");
const { generateToken } = require("../../services/crpyto");
const sendVerifyAccountEmail = require("../../services/mailjet");

class UserResolver {
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
}

module.exports = UserResolver;

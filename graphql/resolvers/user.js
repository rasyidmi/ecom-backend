const moment = require("moment");

const User = require("../../models/user");
const Seller = require("../../models/seller");
const VerifyEmailToken = require("../../models/verify_email_token");
const {
  encryptPassword,
  decryptPassword,
  generateToken,
} = require("../../services/crpyto");
const jwt = require("../../services/jwt");
const sendVerifyAccountEmail = require("../../services/mailjet");

class UserResolver {
  static createUser = async (obj, args, context, info) => {
    const name = obj.data.name;
    const email = obj.data.email;
    const password = obj.data.password;

    const existingUser = await User.findOne({ email: email });
    const existingSeller = await Seller.findOne({ email: email });
    if (existingUser || existingSeller) {
      const error = new Error("User is exists.");
      throw error;
    }

    const newUser = new User({
      name: name,
      email: email,
      password: encryptPassword(password),
    });
    const createdUser = await newUser.save();

    return { ...createdUser._doc };
  };

  static createSeller = async (obj, args, context, info) => {
    const name = obj.data.name;
    const email = obj.data.email;
    const password = obj.data.password;

    const existingSeller = await Seller.findOne({ email: email });
    const existingUser = await User.findOne({ email: email });
    if (existingUser || existingSeller) {
      const error = new Error("User is exists.");
      throw error;
    }

    const newSeller = new Seller({
      name: name,
      email: email,
      password: encryptPassword(password),
    });
    const createdSeller = await newSeller.save();

    return { ...createdSeller._doc };
  };

  static login = async (obj, args, context, info) => {
    const email = obj.data.email;
    const password = obj.data.password;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User is not found.");
    }
    const decryptedPassword = decryptPassword(user.password);
    if (password != decryptedPassword) {
      throw new Error("Wrong password.");
    }
    // Create JWT.
    const token = jwt.signJwt({ _id: user._id, email: email });

    return { _id: user._id, email: user.email, token: token };
  };

  static loginSeller = async (obj, args, context, info) => {
    const email = obj.data.email;
    const password = obj.data.password;

    const user = await Seller.findOne({ email: email });
    if (!user) {
      throw new Error("User is not found.");
    }
    const decryptedPassword = decryptPassword(user.password);
    if (password != decryptedPassword) {
      throw new Error("Wrong password.");
    }
    // Create JWT.
    const token = jwt.signJwt({ _id: user._id, email: email });

    return { _id: user._id, email: user.email, token: token };
  };

  static sendVerifyEmail = async (obj, args, context, info) => {
    if (!args) {
      throw new Error("You are not authenticated.");
    }
    if (!args.user) {
      throw new Error("You are not authenticated.");
    }
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

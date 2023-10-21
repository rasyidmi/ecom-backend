const User = require("../../models/user");
const Seller = require("../../models/seller");

const { encryptPassword, decryptPassword } = require("../../services/crpyto");
const jwt = require("../../services/jwt");

class UserResolver {
  static createUser = async (obj, args, context, info) => {
    const name = obj.data.name;
    const email = obj.data.email;
    const password = obj.data.password;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
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

    const existingUser = await Seller.findOne({ email: email });
    if (existingUser) {
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
    
  };
}

module.exports = UserResolver;

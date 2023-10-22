const UserResolver = require("./resolvers/user");

const resolvers = {
  createUser: UserResolver.createUser,
  createSeller: UserResolver.createSeller,
  login: UserResolver.login,
  loginSeller: UserResolver.loginSeller,
  sendVerifyEmail: UserResolver.sendVerifyEmail,
};

module.exports = resolvers;

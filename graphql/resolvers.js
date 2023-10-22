const UserResolver = require("./resolvers/user");

const resolvers = {
  sendVerifyEmail: UserResolver.sendVerifyEmail,
  getUser: UserResolver.getUser,
};

module.exports = resolvers;

const { GraphQLNonNull } = require("graphql");
const { User, UpdateUserInputData, VerifyEmailToken } = require("../user");

const userFields = {
  currentUser: {
    type: new GraphQLNonNull(User),
  },
  updateUser: {
    args: {
      data: {
        type: new GraphQLNonNull(UpdateUserInputData),
      },
    },
    type: new GraphQLNonNull(User),
  },
  sendVerifyEmail: {
    type: new GraphQLNonNull(VerifyEmailToken),
  },
};

module.exports = userFields;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    wallet: { type: new GraphQLNonNull(GraphQLInt) },
    token: { type: GraphQLString },
  },
});

const VerifyEmailToken = new GraphQLObjectType({
  name: "VerifyEmailToken",
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    expiredDate: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const UpdateUserInputData = new GraphQLInputObjectType({
  name: "UpdateUserInputData",
  fields: {
    name: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
});

exports.User = User;
exports.VerifyEmailToken = VerifyEmailToken;
exports.UpdateUserInputData = UpdateUserInputData;

const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const queryFields = require("./fields/query_fields");
const mutationFields = require("./fields/mutation_fields");

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: queryFields,
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: mutationFields,
  }),
});

module.exports = schema;

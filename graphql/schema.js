const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const path = require("path");

const graphqlSchema = loadSchemaSync(
  path.join(__dirname, "schemas", "schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

module.exports = graphqlSchema;

const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const cors = require('cors')

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const apiKeyAuth = require("./middlewares/api_key_authentication");


const app = express();
app.use(cors());
app.use(apiKeyAuth);
app.all(
  "/graphql",
  createHandler({ schema: graphqlSchema, rootValue: graphqlResolver })
);

module.exports = app;

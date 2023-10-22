const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const cors = require("cors");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const { apiKeyAuth, loginAauth } = require("./middlewares/auth");
const { verifyEmail } = require("./rest/controllers/verify_email");

const app = express();
app.use(cors());
app.get("/confirm/:tokenId/:token", verifyEmail);
app.use(apiKeyAuth);
// app.use(loginAauth);
app.all(
  "/graphql",
  createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    context: loginAauth,
  })
);

module.exports = app;

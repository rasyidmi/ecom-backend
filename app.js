const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const cors = require("cors");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const { loginAauth } = require("./middlewares/auth");
const userRouter = require("./rest/routes/user_route");
const { verifyToken } = require("./services/jwt");
const { errorHandler } = require("./middlewares/error_handler");

const app = express();
app.use(cors());
app.use(userRouter);
app.use(loginAauth);
app.use(errorHandler);
app.all(
  "/graphql",
  createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    context: async (req) => {
      const authHeader = req.headers.authorization;
      const token = authHeader.substring(7, authHeader.length);
      const payload = verifyToken(token);
      return { user: { id: payload.id, email: payload.email } };
    },
  })
);

module.exports = app;

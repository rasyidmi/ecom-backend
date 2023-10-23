const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const cors = require("cors");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const userRouter = require("./rest/routes/user_route");
const productRouter = require("./rest/routes/product_route");
const { verifyToken } = require("./services/jwt");
const { errorHandler } = require("./middlewares/error_handler");
const { loginAauth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use("/product", productRouter);
app.use(loginAauth);
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
app.use(errorHandler);

module.exports = app;

require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

const port = 4000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.3jnlzav.mongodb.net/ecomdb?retryWrites=true&w=majority`
  )
  .then((client) => {
    console.log("Success connect to database.");
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to database.");
  });

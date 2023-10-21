const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verifyEmailTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
});

module.exports = mongoose.model("VerifyEmailToken", verifyEmailTokenSchema);

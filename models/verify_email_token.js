const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verifyEmailTokenSchema = new Schema({
  token: { type: String, required: true },
  email: { type: String, required: true },
  expiredDate: { type: Date, required: true },
});

module.exports = mongoose.model("verify_email_token", verifyEmailTokenSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true, default: "" },
  password: { type: String, required: true },
  wallet: { type: Number, required: true, default: 0 },
  isVerified: { type: Boolean, reqired: true, default: false },
});

module.exports = mongoose.model("user", userSchema);

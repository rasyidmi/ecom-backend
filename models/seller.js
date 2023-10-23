const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true, default: "" },
  wallet: { type: Number, required: true, default: 0 },
  isVerified: { type: Boolean, reqired: true, default: false },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("seller", sellerSchema);

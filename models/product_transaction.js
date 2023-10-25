const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTransactionSchema = new Schema({
  buyerId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "seller", required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
  status: { type: String, required: true, default: "RECEIVED" },
});

module.exports = mongoose.model("product_transaction", productTransactionSchema);

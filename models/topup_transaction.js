const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topUpTransaction = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "RECEIVED" },
});

module.exports = mongoose.model("topup_transaction", topUpTransaction);

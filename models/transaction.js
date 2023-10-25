const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("transaction", transactionSchema);

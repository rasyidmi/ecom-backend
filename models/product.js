const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  quantity: {type: Number, required: true, default: 0},
  ownerId: { type: Schema.Types.ObjectId, ref: 'seller' }
});

module.exports = mongoose.model("product", productSchema);

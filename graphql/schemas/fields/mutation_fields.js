const userFields = require("./user_fields");
const productFields = require("./product_fields");
const transactionFields = require("./transaction_fields");

const mutationFields = {
  updateUser: userFields.updateUser,
  sendVerifyEmail: userFields.sendVerifyEmail,
  createProduct: productFields.createProduct,
  updateProduct: productFields.updateProduct,
  buyProduct: transactionFields.buyProduct,
  acceptBuyProduct: transactionFields.acceptBuyProduct,
  topUp: transactionFields.topUp,
};

module.exports = mutationFields;

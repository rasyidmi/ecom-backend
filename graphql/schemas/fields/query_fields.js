const productFields = require("./product_fields");
const userFields = require("./user_fields");
const transactionFields = require("./transaction_fields");

const queryFields = {
  currentUser: userFields.currentUser,
  getProduct: productFields.getProduct,
  getProductsBySeller: productFields.getProductsBySeller,
  getSellerProduct: productFields.getSellerProduct,
  getAllProducts: productFields.getAllProducts,
  getTransactions: transactionFields.getTransactions,
  TopUpTransaction: transactionFields.TopUpTransaction,
  ProductTransaction: transactionFields.ProductTransaction,
};

module.exports = queryFields;

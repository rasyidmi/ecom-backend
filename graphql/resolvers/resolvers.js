const ProductResolver = require("./product");
const UserResolver = require("./user");
const TransactionResolver = require("./transaction");

const resolvers = {
  currentUser: UserResolver.getCurrentUserData,
  updateUser: UserResolver.updateUser,
  sendVerifyEmail: UserResolver.sendVerifyEmail,
  createProduct: ProductResolver.createProduct,
  getProduct: ProductResolver.getProductById,
  getProductsBySeller: ProductResolver.getProductBySeller,
  getSellerProduct: ProductResolver.getSellerProduct,
  getAllProducts: ProductResolver.getAllProducts,
  deleteProduct: ProductResolver.deleteProduct,
  updateProduct: ProductResolver.updateProduct,
  buyProduct: TransactionResolver.buyProduct,
  acceptBuyProduct: TransactionResolver.acceptBuyProduct,
  topUp: TransactionResolver.topUp,
  getTransactions: TransactionResolver.getTransactions,
};

module.exports = resolvers;

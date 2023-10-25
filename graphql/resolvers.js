const ProductResolver = require("./resolvers/product");
const UserResolver = require("./resolvers/user");
const TransactionResolver = require("./resolvers/transaction");

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
};

module.exports = resolvers;

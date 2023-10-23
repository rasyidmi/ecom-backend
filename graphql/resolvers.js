const ProductResolver = require("./resolvers/product");
const UserResolver = require("./resolvers/user");

const resolvers = {
  currentUser: UserResolver.getCurrentUserData,
  topUp: UserResolver.topUp,
  updateUser: UserResolver.updateUser,
  sendVerifyEmail: UserResolver.sendVerifyEmail,
  createProduct: ProductResolver.createProduct,
  getProduct: ProductResolver.getProductById,
  getProductsBySeller: ProductResolver.getProductBySeller,
  getAllProducts: ProductResolver.getAllProducts,
  deleteProduct: ProductResolver.deleteProduct,
  updateProduct: ProductResolver.updateProduct,
};

module.exports = resolvers;

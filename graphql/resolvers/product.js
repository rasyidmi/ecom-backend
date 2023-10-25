const mongoose = require("mongoose");

const Seller = require("../../models/seller");
const Product = require("../../models/product");
const User = require("../../models/user");
const ProductTransaction = require("../../models/product_transaction");

class ProductResolver {
  static createProduct = async (obj, args, context, info) => {
    const sellerId = args.user.id;
    const productName = obj.data.name;
    const productPrice = obj.data.price;
    const productQuantity = obj.data.quantity;

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      throw new Error("User not found.");
    }

    const product = new Product({
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      ownerId: new mongoose.Types.ObjectId(sellerId),
    });
    const createdProduct = await product.save();

    return {
      id: createdProduct._id,
      name: createdProduct.name,
      price: createdProduct.price,
      quantity: createdProduct.quantity,
      ownerId: createdProduct.ownerId,
    };
  };

  static getProductById = async (obj, args, context, info) => {
    const productId = obj.id;

    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");
    return { ...product._doc, id: product._id };
  };

  static getProductBySeller = async (obj, args, context, info) => {
    const sellerId = obj.sellerId;

    const products = await Product.find({
      ownerId: new mongoose.Types.ObjectId(sellerId),
    });
    return products;
  };

  // Get current login seller products.
  static getSellerProduct = async (obj, args, context, info) => {
    const sellerId = args.user.id;

    const products = await Product.find({
      ownerId: new mongoose.Types.ObjectId(sellerId),
    });

    return products;
  };

  static getAllProducts = async (obj, args, context, info) => {
    if (obj.page <= 0 || obj.size <= 0)
      throw new Error("Page or Size must be more than zero.");
    const limit = obj.size;
    const skip = limit * (obj.page - 1);
    const products = await Product.find()
      .sort({ name: "asc" })
      .limit(limit)
      .skip(skip);
    const totalProducts = await Product.countDocuments();
    return {
      products: products,
      total: totalProducts,
      currentTotal: products.length,
    };
  };

  static deleteProduct = async (obj, args, context, info) => {
    const sellerId = args.user.id;
    const productId = obj.id;

    const deletedProduct = await Product.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(productId),
      ownerId: new mongoose.Types.ObjectId(sellerId),
    });
    if (!deletedProduct)
      throw new Error("You are not the seller or product not found");

    return "Success";
  };

  static updateProduct = async (obj, args, context, info) => {
    const sellerId = args.user.id;
    const productId = obj.data.id;

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId),
      ownerId: new mongoose.Types.ObjectId(sellerId),
    });
    if (!product)
      throw new Error("You are not the seller or product not found");
    product.set(obj.data);
    const updatedProduct = await product.save();

    return { ...updatedProduct._doc, id: updatedProduct._id };
  };
}

module.exports = ProductResolver;

const mongoose = require("mongoose");

const User = require("../../models/user");
const Seller = require("../../models/seller");
const Product = require("../../models/product");
const ProductTransaction = require("../../models/product_transaction");
const TopUpTransaction = require("../../models/topup_transaction");

class TransactionResolver {
  static buyProduct = async (obj, args, context, info) => {
    const userId = args.user.id;
    const quantity = obj.data.quantity;
    const productId = obj.data.productId;

    const user = await User.findById(userId);
    if (!user) throw new Error("You are not a user.");
    const product = await Product.findById(productId);

    // TODO: Payment server
    // Check is the user has enough wallet to buy the product.
    if (user.wallet < product.price * quantity)
      throw new Error("Your money is not enough.");

    // Send transaction request to the seller.
    const productTransaction = new ProductTransaction({
      buyerId: new mongoose.Types.ObjectId(userId),
      sellerId: product.ownerId,
      amount: product.price * quantity,
      quantity: quantity,
      productId: product._id,
    });
    const createdDoc = await productTransaction.save();
    // Reduce the buyer wallet.
    user.wallet = user.wallet - product.price * quantity;
    await user.save();

    return createdDoc;
  };

  static acceptBuyProduct = async (obj, args, context, info) => {
    const transactionId = obj.transactionId;
    const sellerId = args.user.id;

    const transaction = await ProductTransaction.findById(transactionId);
    const seller = await Seller.findById(sellerId);
    if (sellerId != transaction.sellerId)
      throw new Error("You are not the seller");
    const product = await Product.findById(transaction.productId);
    // Decrease the product quantity
    product.quantity = product.quantity - transaction.quantity;
    // Increase the seller wallet
    seller.wallet = seller.wallet + transaction.amount;
    // Update transaction status.
    transaction.status = "COMPLETED";

    const updatedTransaction = await transaction.save();
    await seller.save();
    await product.save();

    return updatedTransaction;
  };

  static topUp = async (obj, args, context, info) => {
    const userId = args.user.id;
    const topUpAmount = obj.amount;
    let user;
    user = await User.findById(userId);
    if (!user) user = await Seller.findById(userId);
    if (!user) throw new Error("User not found.");
    // TODO: implement payment gateway
    user.wallet = user.wallet + topUpAmount;
    const topUpTransaction = new TopUpTransaction({
      userId: user._id,
      amount: topUpAmount,
      status: "COMPLETED",
    });
    user = await user.save();
    const transactionDoc = await topUpTransaction.save();

    return transactionDoc;
  };
}

module.exports = TransactionResolver;

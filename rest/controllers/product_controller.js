const Product = require("../../models/product");
const { awsDeleteFile } = require("../../services/aws_s3");

class ProductController {
  static async uploadImages(req, res, next) {
    try {
      const userId = req.user.id;
      const files = req.files;
      const productId = req.body.id;
      const product = await Product.findById(productId);

      if (userId != product.ownerId) {
        return res.status(401).json({ message: "You are not the seller" });
      }
      const images = [];
      files.forEach((file) => {
        images.push(file.location);
      });
      product.images = images;
      await product.save();
      return res
        .status(200)
        .json({ message: "Success upload product images." });
    } catch (error) {
      next(error);
    }
  }

  static async deleteImage(req, res, next) {
    try {
      const userId = req.user.id;
      const imageUrl = req.body.imageUrl;
      const productId = req.query.productId;
      const product = await Product.findById(productId);

      if (userId != product.ownerId) {
        return res.status(401).json({ message: "You are not the seller" });
      }
      await awsDeleteFile(imageUrl, `product-images/${productId}`);
      // Delete image in DB.
      const newImages = [];
      product.images.forEach((fileUrl) => {
        if (fileUrl != imageUrl) {
          newImages.push(fileUrl);
        }
      });
      product.images = newImages;
      await product.save();
      return res.status(200).json({ message: "Success delete image." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;

const Product = require("../../models/product");

class ProductController {
  static async uploadImages(req, res, next) {
    try {
      const files = req.files;
      const productId = req.body.id;
      const product = await Product.findById(productId);

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
}

module.exports = ProductController;

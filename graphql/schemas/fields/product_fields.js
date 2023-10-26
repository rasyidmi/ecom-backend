const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require("graphql");

const {
  Product,
  ProductsPaginated,
  CreateProductData,
  UpdateProductData,
} = require("../product");

const productFields = {
  getProduct: {
    args: {
      id: {
        type: GraphQLID,
      },
    },
    type: Product,
  },
  getProductsBySeller: {
    args: {
      sellerId: {
        type: GraphQLID,
      },
    },
    type: new GraphQLList(Product),
  },
  getSellerProduct: {
    type: new GraphQLList(Product),
  },
  getAllProducts: {
    args: {
      page: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      size: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    type: ProductsPaginated,
  },
  createProduct: {
    args: {
      data: {
        type: new GraphQLNonNull(CreateProductData),
      },
    },
    type: Product,
  },
  deleteProduct: {
    args: {
      productId: {
        type: GraphQLID,
      },
    },
    type: GraphQLString,
  },
  updateProduct: {
    args: {
      data: {
        type: new GraphQLNonNull(UpdateProductData),
      },
    },
    type: Product,
  },
};

module.exports = productFields;

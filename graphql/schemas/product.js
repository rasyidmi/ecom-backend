const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const Product = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    ownerId: { type: GraphQLID },
    images: { type: new GraphQLList(GraphQLString) },
  },
});

const ProductsPaginated = new GraphQLObjectType({
  name: "ProductsPaginated",
  fields: {
    products: { type: new GraphQLList(Product) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
    currentTotal: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const CreateProductData = new GraphQLInputObjectType({
  name: "CreateProductData",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: GraphQLInt },
  },
});

const UpdateProductData = new GraphQLInputObjectType({
  name: "UpdateProductData",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

exports.Product = Product;
exports.ProductsPaginated = ProductsPaginated;
exports.CreateProductData = CreateProductData;
exports.UpdateProductData = UpdateProductData;

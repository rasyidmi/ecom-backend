const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");

const TransactionInterface = new GraphQLInterfaceType({
  name: "Transaction",
  fields: {
    id: { type: GraphQLID },
    status: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolveType(transaction) {
    if (transaction.buyerId) {
      return "ProductTransaction";
    } else {
      return "TopUpTransaction";
    }
  },
});

const ProductTransaction = new GraphQLObjectType({
  name: "ProductTransaction",
  interfaces: [TransactionInterface],
  fields: {
    id: { type: GraphQLID },
    status: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    buyerId: { type: GraphQLID },
    sellerId: { type: GraphQLID },
    productId: { type: GraphQLID },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const TopUpTransaction = new GraphQLObjectType({
  name: "TopUpTransaction",
  interfaces: [TransactionInterface],
  fields: {
    id: { type: GraphQLID },
    status: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: GraphQLID },
  },
});

const BuyProductData = new GraphQLInputObjectType({
  name: "BuyProductData",
  fields: {
    productId: { type: GraphQLID },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

exports.TopUpTransaction = TopUpTransaction;
exports.TransactionInterface = TransactionInterface;
exports.ProductTransaction = ProductTransaction;
exports.BuyProductData = BuyProductData;

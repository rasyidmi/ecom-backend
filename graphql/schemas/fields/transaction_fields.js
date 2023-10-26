const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} = require("graphql");

const { Buy } = require("../product");

const {
  TransactionInterface,
  TopUpTransaction,
  ProductTransaction,
  BuyProductData,
} = require("../transaction");

const transactionFields = {
  getTransactions: {
    type: new GraphQLList(TransactionInterface),
  },
  buyProduct: {
    args: {
      data: {
        type: new GraphQLNonNull(BuyProductData),
      },
    },
    type: new GraphQLNonNull(ProductTransaction),
  },
  acceptBuyProduct: {
    args: {
      transactionId: {
        type: GraphQLID,
      },
    },
    type: new GraphQLNonNull(ProductTransaction),
  },
  topUp: {
    args: {
      amount: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    type: new GraphQLNonNull(TopUpTransaction),
  },
  TopUpTransaction: { type: TopUpTransaction },
  ProductTransaction: { type: ProductTransaction },
};

module.exports = transactionFields;

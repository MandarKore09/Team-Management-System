const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    userId: { type: GraphQLInt },
    workId: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

module.exports = TodoType;

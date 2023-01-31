// This code defines a GraphQL object type called "User" with several fields. The fields are defined using the
// GraphQLObjectType constructor from the "graphql" library.

const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const UserType = new graphql.GraphQLObjectType({
  name: "Users",
  fields: () => {
    return {
      userId: { type: GraphQLInt },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      status: { type: GraphQLInt },
      statusMessage: { type: GraphQLString },
      error: { type: GraphQLString },
    };
  },
});

module.exports = UserType;

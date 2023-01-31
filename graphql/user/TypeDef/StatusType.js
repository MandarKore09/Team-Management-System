// This code defines a GraphQL object type called "status" which has 3 fields: "status", "statusMessage", and "error".
// The "status" field is of type "GraphQLInt", the "statusMessage" field is of type "GraphQLString", and the "error"
// field is also of type "GraphQLString". This object type is then exported using "module.exports" so that it can be
// imported and used in other parts of the application.
// Use this to query the status of an operation, for example if the operation was successful or not.
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const StatusType = new graphql.GraphQLObjectType({
  name: "status",
  fields: () => ({
    status: { type: GraphQLInt },
    statusMessage: { type: GraphQLString },
    error: { type: GraphQLString },
  }),
});

module.exports = StatusType;

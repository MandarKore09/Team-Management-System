const { GraphQLInt, GraphQLList } = require("graphql");
const { connect } = require("../../dbconfig");
const User = require("../../models/User");
const UserType = require("./typeDef");

const getUser = {
  type: UserType,
  args: {
    userId: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    await connect();
    const user = await User.findByPk(args.userId, {
      // include: ["todos"],
    });
    return user;
  },
};

const getAllUsers = {
  type: new GraphQLList(UserType),
  resolve: async () => {
    await connect();
    const user = await User.findAll();
    return user;
  },
};

module.exports = {
  getUser,
  getAllUsers,
};

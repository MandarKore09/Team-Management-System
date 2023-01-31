const { GraphQLInt } = require("graphql");
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

module.exports = {
  getUser,
};

const { GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");
const UserType = require("./TypeDef/UserType");
const StatusType = require("./TypeDef/StatusType");
const bcrypt = require("bcrypt");
const { connect } = require("../../dbconfig");
const User = require("../../models/User");

const createUser = {
  type: UserType,
  args: {
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    args.password = bcrypt.hashSync(args.password, 10);
    await connect();
    const user = await User.create(args);
    return user;
  },
};

const updateUser = {
  type: StatusType,
  args: {
    userId: { type: GraphQLInt },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
  },

  // resolve property is a function that is called when the mutation is executed. The function takes args, finds the user
  // with the provided id in the database, updates the user with the input arguments and returns a status object with the update status and message.
  // First, the function finds a user in the database using the User.findOne() method and the id argument.
  // It then attempts to update that user with the new information provided in the args object using the User.update() method.
  resolve: async (parent, args) => {
    let userDetails = await User.findOne({
      where: {
        userId: args.userId,
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
      },
    });

    try {
      await User.update(
        {
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
        },
        {
          where: {
            userId: args.userId,
          },
        }
      );
      // If the update is successful, the function returns an object with a status of 200, a statusMessage of "Updated Successfully"
      return {
        status: 200,
        statusMessage: "Updated Successfully",
        error: "",
      };
    } catch (error) {
      //If error occurs this will log error to console and return object with the status.
      console.log("Error inside  USER_UPDATE API.", error.toString());
      return {
        status: 404,
        statusMessage: "Some Error While Updating User.",
      };
    }
  },
};

const deleteUser = {
  type: StatusType,
  args: {
    userId: { type: GraphQLInt },
  },

  // resolve property is a function that is called when the mutation is executed. The function takes args, finds the user
  // with the provided id in the database, deletes the user and returns a status object with the delete status and message.
  resolve: async (parent, args) => {
    let userDetails = await User.findOne({
      where: {
        userId: args.userId,
      },
    });

    if (!userDetails) {
      return {
        status: 400,
        statusMessage: "No Data Found",
        error: "Failed To Delete",
      };
    }
    try {
      let userDelete = await User.destroy({
        where: {
          userId: args.userId,
        },
      });

      return {
        status: 200,
        statusMessage: "Deleted Successfully",
        error: "",
      };
    } catch (error) {
      console.log("Error inside  USER_DELETE API.", error.toString());
      return {
        status: 404,
        statusMessage: "Some Error While Deleting User.",
      };
    }
  },
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
};

const { GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");

const TodoType = require("./typeDef");

const { connect } = require("../../dbconfig");

const Todo = require("../../models/Todo");

const createTodo = {
  type: TodoType,
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: { type: GraphQLNonNull(GraphQLInt) },
    status: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    await connect();
    const todo = await Todo.create(args);
    return todo;
  },
};

const updateTodo = {
  type: TodoType,
  args: {
    workId: { type: GraphQLNonNull(GraphQLInt) },
    userId: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    await connect();
    // logic to filter the blank values
    const todo = await Todo.update(args, {
      where: {
        userId: args.userId,
      },
    });
    return todo;
  },
};

const deleteTodo = {
  type: GraphQLString,
  args: {
    userId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context, info) => {
    await connect();
    const todo = await Todo.destroy({
      where: {
        userId: args.userId,
      },
    });
    return "todo deleted successfully";
  },
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
};

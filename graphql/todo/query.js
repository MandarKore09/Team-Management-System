const { GraphQLList, GraphQLInt } = require("graphql");
const { connect } = require("../../dbconfig");
const Todo = require("../../models/Todo");
const TodoType = require("./typeDef");

const getAllTodos = {
  type: new GraphQLList(TodoType),
  resolve: async (parent, args, context, info) => {
    await connect();
    const todos = await Todo.findAll({
      //  include: ["user"],
    });
    return todos;
  },
};

const getTodo = {
  type: TodoType,
  args: {
    workId: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    console.log("args", args);
    await connect();
    const todo = await Todo.findByPk(args.workId, {
      //include: ["user"],
    });
    return todo;
  },
};

module.exports = {
  getAllTodos,
  getTodo,
};

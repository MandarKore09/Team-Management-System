const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbconfig");
const { graphqlHTTP } = require("express-graphql");

const { GraphQLObjectType, GraphQLSchema } = require("graphql");
// db.init()
const userMutations = require("./graphql/user/mutations");
const userQuery = require("./graphql/user/query");
const todoMutations = require("./graphql/todo/mutations");
const todoQuery = require("./graphql/todo/query");
const User = require("./models/User");
const Todo = require("./models/Todo");

let PORT = 4000;

const corsO = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

User.hasMany(Todo, {
  foreignKey: "userId",
});
//Todo.belongsTo(User);

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQuery,
    ...todoQuery,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...userMutations,
    ...todoMutations,
  }),
});

app.use(cors(corsO));

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
      query: Query,
      mutation: Mutation,
    }),
  })
);

app.listen(PORT, () => {
  // console.log("Server is running on port 4000");
  console.log(`App is listening at http://localhost:${PORT}/graphql`);
});

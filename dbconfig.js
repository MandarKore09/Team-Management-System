const { Sequelize } = require("sequelize");

const sequelise = new Sequelize("teammanagement", "root", "password", {
  dialect: "mysql",
  host: "localhost",
  logging: true,
});

function init() {
  const User = require("./models/User");
  console.log(User);
  const Todo = require("./models/Todo");
  console.log(Todo);
  sequelise
    .sync({
      force: true,
    })
    .then((res) => {
      console.log("Database connection successful");
    })
    .catch((err) => console.log("Errors", err));
}

async function connect() {
  try {
    await sequelise.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

function close() {
  sequelise.close();
}

module.exports = {
  init,
  connect,
  close,
  sequelise,
};

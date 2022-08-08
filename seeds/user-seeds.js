
const { User } = require("../models");

const userData = [
  {
    username: "Dreday",
    password: "067476543",
  },
  {
    username: "Haly Baly",
    password: "541289632",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
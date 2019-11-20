const db = require("../data/db-config.js");

const find = () => {
  return db("schemes");
};

const findByID = id => {
  return db("schemes").where({ id });
};

module.exports = {
  find,
  findByID
};

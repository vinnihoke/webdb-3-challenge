const db = require("../data/db-config.js");

const find = () => {
  return db("schemes");
};

const findByID = id => {
  return db("schemes").where({ id });
};

const findSteps = steps => {
  return db("steps")
    .select("schemes.id", "scheme_name", "step_number", "instructions")
    .innerJoin("schemes", function() {
      this.on("steps.scheme_id", "=", "schemes.id").andOn(
        "schemes.id",
        "=",
        Number(steps)
      );
    })
    .orderBy("scheme_name", "step_number");

  // db("steps")
  //   .select("id", "scheme_name", "step_number", "instructions")
  //   .join("schemes")
  //   .on("steps.scheme_id", "=", "schemes.id")
  //   .orderBy("scheme_name", "step_number");
};

module.exports = {
  find,
  findByID,
  findSteps
};

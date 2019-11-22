const db = require("../data/db-config.js");

const find = () => {
  return db("schemes");
};

const findById = id => {
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
};

const add = scheme => {
  return db("schemes")
    .insert(scheme)
    .then(schemes => {
      return findById(schemes[0]);
    });
};

const update = (id, changes) => {
  return db("schemes")
    .where("id", id)
    .update(changes);
};

const remove = id => {
  return db("schemes")
    .where("id", id)
    .del();
};

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

const tableseating = require("../seedfiles/TableSeeds");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE tableseating RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("tableseating").insert(tableseating);
    });
};

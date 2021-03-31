const read = (knex, tableId) => {
  return knex("tableseating").select("*").where({ table_id: tableId }).first();
};

const list = (knex) => {
  return knex("tableseating").select("*").orderBy("table_name", "asc");
};
const create = (knex, newTable) => {
  return knex("tableseating").insert(newTable).returning("*");
};
const update = (knex, tableId, updatedTable) => {
  return knex("tableseating")
    .select("*")
    .where({ table_id: tableId })
    .update(updatedTable, "*");
};
const destroy = (knex, reservationId) => {
  return knex("tableseating").where({ reservation_id: reservationId }).del();
};

module.exports = {
  list,
  create,
  read,
  update,
  destroy,
};

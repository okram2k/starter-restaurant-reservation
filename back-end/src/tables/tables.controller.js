/**
 * List handler for table resources
 */
const service = require("./tables.service.js");

//valid properties for a list

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id", "status"];

//check that incoming date only has expected valid properties

function hasOnlyValidProperties(req, res, next) {
  const data = ({} = req.body);
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

//check to make sure a table exists and if it does pass along it's data.

async function tableExists(req, res, next) {
  const knexInstance = req.app.get("db");
  const error = { status: 404, message: `Table cannot be found.` };
  const { tablesId } = req.params;
  if (!tablesId) return next(error);

  let table = await service.read(knexInstance, tablesId);
  if (!table) return next(error);
  res.locals.table = table;
  next();
}

//create a new table

async function create(req, res, next) {
  const knexInstance = req.app.get("db");
  let newTable = await service.create(knexInstance, req.body);
  if (newTable instanceof Error) return next({ message: newTable.message });

  res.status(201).json({ data: newTable });
}

//update an existng table

async function update(req, res, next) {
  const {
    table: { table_id: tableId, ...table },
  } = res.locals;
  const knexInstance = req.app.get("db");

  const updatedTable = { ...table, ...req.body };

  let newTable = await service.update(knexInstance, tableId, updatedTable);
  newTable = await service.read(knexInstance, tableId);
  if (newTable instanceof Error) return next({ message: newTable.message });
  res.json({ data: newTable });
}

//seat a reservation at a table.

async function seat(req, res, next) {
  const {
    table: { table_id: tableId, ...table },
  } = res.locals;
  const error = { status: 400, message: `Table occupied.` };
  if (table.status === "Occupied") return next(error);
  const knexInstance = req.app.get("db");

  const updatedTable = { ...table, ...req.body, status: "Occupied" };

  let newTable = await service.update(knexInstance, tableId, updatedTable);
  newTable = await service.read(knexInstance, tableId);
  if (newTable instanceof Error) return next({ message: newTable.message });
  res.json({ data: newTable });
}

//unseat a reservation from a table.

async function unseat(req, res, next) {
  const {
    table: { table_id: tableId, ...table },
  } = res.locals;
  const error = { status: 400, message: `Table not occupied.` };
  if (table.status !== "Occupied") return next(error);
  const knexInstance = req.app.get("db");

  const updatedTable = { ...table, status: "Free" };

  let newTable = await service.update(knexInstance, tableId, updatedTable);
  newTable = await service.read(knexInstance, tableId);
  if (newTable instanceof Error) return next({ message: newTable.message });
  res.json({ data: newTable });
}

//delete a table

async function destroy(req, res, next) {
  const knexInstance = req.app.get("db");
  const { table } = res.locals;
  await service.destroy(knexInstance, table.table_id);
  res.sendStatus(204);
}

//list all tables

async function list(req, res, next) {
  const knexInstance = req.app.get("db");
  let table = await service.list(knexInstance);
  if (table instanceof Error) return next({ message: table.message });
  res.json({ data: table });
}

//read a specific table by table_id

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { table } = res.locals;
  res.json({ data: table });
}

module.exports = {
  create: [hasOnlyValidProperties, create],
  update: [hasOnlyValidProperties, tableExists, update],
  seat: [tableExists, seat],
  unseat: [tableExists, unseat],
  destroy: [tableExists, destroy],
  list: [list],
  read: [tableExists, read],
};

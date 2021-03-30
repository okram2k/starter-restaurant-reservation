/**
 * List handler for table resources
 */
 const service = require("./tables.service.js");

 const VALID_PROPERTIES = [
  "table_name",
  "capacity",
  "reservation_id",
  "status",
];

function hasOnlyValidProperties(req, res, next) {
  const data = {} = req.body;
  //console.log(data);
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

 async function tableExists(req, res, next) {
  const knexInstance = req.app.get("db");
  const error = { status: 404, message: `Table cannot be found.` };
  const { tablesId } = req.params;
  //console.log(req.params);
  if (!tablesId) return next(error);

  let table = await service.read(knexInstance, tablesId);
  if (!table) return next(error);
  res.locals.table = table;
  next();
}

async function create(req, res, next) {
  const knexInstance = req.app.get("db");
  console.log("received update", req.body);
  let newTable = await service.create(
    knexInstance,
    req.body
  );
  console.log("posted update");
  if (newTable instanceof Error) return next({ message: newTable.message });
  
  res.status(201).json({ data: newTable });
}

async function update(req, res, next) {
  const {
    table: { table_id: tableId, ...table },
  } = res.locals;
  const knexInstance = req.app.get("db");
  
  const updatedTable = { ...table, ...req.body };

  let newTable = await service.update(
    knexInstance,
    tableId,
    updatedTable
  );
  newTable = await service.read(knexInstance, tableId);
  if (newTable instanceof Error) return next({ message: newTable.message });
  res.json({ data: newTable });
}

async function seat(req, res, next) {
  const {
    table: { table_id: tableId, ...table },
  } = res.locals;
  const knexInstance = req.app.get("db");
  
  const updatedTable = { ...table, ...req.body, status: "Occupied" };

  let newTable = await service.update(
    knexInstance,
    tableId,
    updatedTable
  );
  newTable = await service.read(knexInstance, tableId);
  if (newTable instanceof Error) return next({ message: newTable.message });
  res.json({ data: newTable });
}

async function unseat(req, res, next) {
  const {
    table: { table_id: tableId, ...table },
  } = res.locals;
  const knexInstance = req.app.get("db");
  
  const updatedTable = { ...table, status: "Free" };

  let newTable = await service.update(
    knexInstance,
    tableId,
    updatedTable
  );
  newTable = await service.read(knexInstance, tableId);
  if (newTable instanceof Error) return next({ message: newTable.message });
  res.json({ data: newTable });
}

async function destroy(req, res, next) {
  const knexInstance = req.app.get("db");
  const { table } = res.locals;
  await service.destroy(knexInstance, table.table_id);
  res.sendStatus(204);
}

async function list(req, res, next) {
  const knexInstance = req.app.get("db");
  let table = await service.list(knexInstance);
  if (table instanceof Error) return next({ message: table.message });
  res.json({ data: table });
}

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
/**
 * List handler for reservation resources
 */
 const service = require("./reservations.service.js");

 const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties(req, res, next) {
  const data = {} = req.body;
  console.log(data);
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

 async function reservationExists(req, res, next) {
  const knexInstance = req.app.get("db");
  const error = { status: 404, message: "Reservation cannot be found." };
  const { reservationId } = req.params;
  if (!reservationId) return next(error);

  let reservation = await service.read(knexInstance, reservationId);
  if (!reservationId) return next(error);
  res.locals.reservation = reservation;
  next();
}

async function create(req, res, next) {
  const knexInstance = req.app.get("db");
  console.log("received update", req.body);
  let newReservation = await service.create(
    knexInstance,
    req.body
  );
  console.log("posted update");
  if (newReservation instanceof Error) return next({ message: newReservation.message });
  
  res.status(201).json({ data: newReservation });
}

async function update(req, res, next) {
  const {
    review: { reservation_id: reservationId, ...reservation },
  } = res.locals;
  const knexInstance = req.app.get("db");
  
  const updatedReservation = { ...reservation, ...req.body };

  let newReservation = await service.update(
    knexInstance,
    reservationId,
    updatedReservation
  );
  newReservation = await service.read(knexInstance, reservationId);
  if (newReservation instanceof Error) return next({ message: newReservation.message });
  res.json({ data: newReservation });
}

async function destroy(req, res, next) {
  const knexInstance = req.app.get("db");
  const { reservation } = res.locals;
  await service.destroy(knexInstance, reservation.reservation_id);
  res.sendStatus(204);
}

async function list(req, res, next) {
  const knexInstance = req.app.get("db");
  let reservations = await service.list(knexInstance);
  if (reservations instanceof Error) return next({ message: reservations.message });
  res.json({ data: reservations });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { reservation } = res.locals;
  res.json({ data: reservation });
}
async function listByDate(req, res, next) {
  console.log(req.query);
  const { reservation_date } = req.query;
  const error = { status: 404, message: "Reservation Date cannot be found." };
  if (!reservation_date) return next(error);
 
  const knexInstance = req.app.get("db");
  let reservations = await service.listByDate(knexInstance, reservation_date);
  if (reservations instanceof Error) return next({ message: reservations.message });
  res.json({ data: reservations });
}

module.exports = {
  create: [hasOnlyValidProperties, create],
  update: [hasOnlyValidProperties, reservationExists, update],
  destroy: [reservationExists, destroy],
  list: [list],
  listByDate: [listByDate],
  read: [reservationExists, read],
};
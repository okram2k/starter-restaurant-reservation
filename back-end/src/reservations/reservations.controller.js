/**
 * List handler for reservation resources
 */
const service = require("./reservations.service.js");

//list of valid properties for incoming data

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
  "created_at",
  "updated_at",
];

//check incoming data only has valid properties

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

//check incoming data matches all reservation criteria

function dataValidation(req, res, next) {
  const data = ({} = req.body);
  //add time stamp of last moment of the day to prevent time zone date mishaps
  let adjusteDate = data.reservation_date + " 23:59:59.999Z";
  let inputDate = new Date(adjusteDate);
  let compareDate = new Date();
  //set both times to 00:00:00 so we can compare them cleanly
  inputDate.setHours(0, 0, 0, 0);
  compareDate.setHours(0, 0, 0, 0);

  const error = { status: 400, message: "Invalid Reservation Data" };
  /*data validation, reject if there is 0 or less people in the party,
  the reservation is made for a date in the past, the reservation is on a
  Tuesday (UTCDay 2) or the reservation is not between 10:30am & 9:30 pm*/
  if (data.people <= 0)
    return next({ status: 400, message: "Not enough people in the party" });
  if (inputDate < compareDate)
    return next({
      status: 400,
      message: `Reservation cannot be made for a day in the past`,
    });
  if (inputDate.getUTCDay() === 2)
    return next({ status: 400, message: "No Reservations on Tuesdays" });
  if (data.reservation_time < "10:30" || data.reservation_time > "21:30")
    return next({
      status: 400,
      message: "Reservation must be between 10:30AM & 9:30PM",
    });
  next();
}

//check if a reservaiton_id exists and if so pass it's data along

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

//create a new reservation.

async function create(req, res, next) {
  const knexInstance = req.app.get("db");
  let newReservation = await service.create(knexInstance, req.body);
  if (newReservation instanceof Error)
    return next({ message: newReservation.message });

  res.status(201).json({ data: newReservation });
}

//update an existing reservation

async function update(req, res, next) {
  const {
    reservation: { reservation_id: reservationId, ...reservation },
  } = res.locals;
  const knexInstance = req.app.get("db");

  const updatedReservation = { ...reservation, ...req.body };

  let newReservation = await service.update(
    knexInstance,
    reservationId,
    updatedReservation
  );
  newReservation = await service.read(knexInstance, reservationId);
  if (newReservation instanceof Error)
    return next({ message: newReservation.message });
  res.json({ data: newReservation });
}

//delete an existing reservation

async function destroy(req, res, next) {
  const knexInstance = req.app.get("db");
  const { reservation } = res.locals;
  await service.destroy(knexInstance, reservation.reservation_id);
  res.sendStatus(204);
}

//search for a reservation by phone#. If no phone# is provided
//it will search a dummy number that will return all reservations.

async function search(req, res, next) {
  let { mobile_number } = req.query;
  if (!mobile_number) mobile_number = "xxx-xxx-xxxx";
  const knexInstance = req.app.get("db");
  let reservations = await service.search(knexInstance, mobile_number);
  if (reservations instanceof Error)
    return next({ message: reservations.message });
  res.json({ data: reservations });
}

//read a specific reservation by ID number.

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

//list all reservations on a specific date, ordered by time of reservation.

async function listByDate(req, res, next) {
  const { reservation_date } = req.query;
  const error = { status: 404, message: "Reservation Date cannot be found." };
  if (!reservation_date) return next(error);

  const knexInstance = req.app.get("db");
  let reservations = await service.listByDate(knexInstance, reservation_date);
  if (reservations instanceof Error)
    return next({ message: reservations.message });
  res.json({ data: reservations });
}

//update the status of a reservation

async function statusUpdate(req, res, next) {
  const {
    reservation: { reservation_id: reservationId, ...reservation },
  } = res.locals;
  const knexInstance = req.app.get("db");

  const updatedReservation = { ...reservation, ...req.body };

  let newReservation = await service.update(
    knexInstance,
    reservationId,
    updatedReservation
  );
  newReservation = await service.read(knexInstance, reservationId);
  if (newReservation instanceof Error)
    return next({ message: newReservation.message });
  res.json({ data: newReservation });
}

module.exports = {
  create: [hasOnlyValidProperties, dataValidation, create],
  update: [hasOnlyValidProperties, dataValidation, reservationExists, update],
  statusUpdate: [hasOnlyValidProperties, reservationExists, statusUpdate],
  destroy: [reservationExists, destroy],
  search: [search],
  listByDate: [listByDate],
  read: [reservationExists, read],
};

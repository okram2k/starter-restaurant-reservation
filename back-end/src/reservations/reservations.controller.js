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
  "status",
  "reservation_id",
  "created_at",
  "updated_at"
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

function dataValidation(req,res,next){
  const data = {} = req.body;
  //console.log(data);
  //add time stamp of last moment of the day to prevent time zone date mishaps
  let adjusteDate =  data.reservation_date + " 23:59:59.999Z"
  let inputDate = new Date(adjusteDate);
  let compareDate = new Date();
  inputDate.setHours(0,0,0,0);
  compareDate.setHours(0,0,0,0);

  const error = {status: 400, message: "Invalid Reservation Data"};
  /*data validation, reject if there is 0 or less people in the party,
  the reservation is made for a date in the past, the reservation is on a
  Tuesday (UTCDay 2) or the reservation is not between 10:30am & 9:30 pm*/
  if (data.people <=0) return next({status: 400, message: "Not enough people in the party"});
  if (inputDate < compareDate) return next({status: 400, message: `Reservation cannot be made for a day in the past`});
  if (inputDate.getUTCDay() === 2) return next({status: 400, message: "No Reservations on Tuesdays"});
  if (data.reservation_time < "10:30" || data.reservation_time > "21:30") return next({status: 400, message: "Reservation must be between 10:30AM & 9:30PM"});
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
  if (newReservation instanceof Error) return next({ message: newReservation.message });
  res.json({ data: newReservation });
}

async function destroy(req, res, next) {
  const knexInstance = req.app.get("db");
  const { reservation } = res.locals;
  await service.destroy(knexInstance, reservation.reservation_id);
  res.sendStatus(204);
}

async function search(req, res, next) {
  let { mobile_number } = req.query;
  //console.log(req.query);
  if (!mobile_number) mobile_number = "xxx-xxx-xxxx";
  const knexInstance = req.app.get("db");
  let reservations = await service.search(knexInstance, mobile_number);
  if (reservations instanceof Error) return next({ message: reservations.message });
  res.json({ data: reservations });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { reservation } = res.locals;
  res.json({ data: reservation });
}
async function listByDate(req, res, next) {
  //console.log(req.query);
  const { reservation_date } = req.query;
  const error = { status: 404, message: "Reservation Date cannot be found." };
  if (!reservation_date) return next(error);
 
  const knexInstance = req.app.get("db");
  let reservations = await service.listByDate(knexInstance, reservation_date);
  if (reservations instanceof Error) return next({ message: reservations.message });
  res.json({ data: reservations });
}

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
  if (newReservation instanceof Error) return next({ message: newReservation.message });
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
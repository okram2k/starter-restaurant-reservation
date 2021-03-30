const read = (knex, reservationId) =>{
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .first();
};

const list = knex =>{
    return knex("reservations")
        .select("*")
};
const create = (knex, reservation) => {
    return knex("reservations")
        .insert(reservation)
        .returning("*");
  };
  const update = (knex, reservationId, updatedReservation) => {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: reservationId })
      .update(updatedReservation, "*");
  };
  const destroy = (knex, reservationId) => {
    return knex("reservations")
        .where({ reservation_id: reservationId })
        .del();
  };
const listByDate = (knex, date) =>{

    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .whereNot({status: "Finished"})
        .whereNot({status: "Cancelled"})
        .orderBy('reservation_time', 'asc');
}

const search =(knex, mobile_number) => {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

module.exports = {
    list,
    search,
    create,
    read,
    update,
    destroy,
    listByDate
  };
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
        .orderBy('reservation_time', 'asc');
}

module.exports = {
    list,
    create,
    read,
    update,
    destroy,
    listByDate
  };
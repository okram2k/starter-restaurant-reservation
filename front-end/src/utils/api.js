/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://restaurant-reservation-back-end.vercel.app";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Creates a new reservation.
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of the new reservation from the database
 */


export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations/`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(reservation),
    signal,
  };
  console.log("post attempt:", url, options);
  return await fetchJson(url, options);
}

/**
 * Retrieves a single reservatio with a reservationId
 * @param reservationId
 * The reservation Id for the reservation
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */


export async function readReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Update a single reservatio with a reservationId
 * @param updatedReservation
 * An object of the updatedReservation, including the reservation_id
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function updateReservation(updatedReservation, signal) {
  const url = `${API_BASE_URL}/reservations/${updatedReservation.reservation_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedReservation),
    signal,
  };
  return await fetchJson(url, options)
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Delete a single reservatio with a reservationId
 * @param reservationId
 * The reservation Id for the reservation
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function deleteReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

/**
 * Retrieves all reservations of a certain date.
 * @param reservation_date
 * A date in YYYY-MM-DD format
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function readByDate(reservation_date, signal) {
  const url = `${API_BASE_URL}/reservations/ByDate?reservation_date=${reservation_date}`;
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Retrieves all reservations of a certain phone number.
 * @param mobile_phone
 * A phone number to search. The number will be stripped of all non numerical digits
 * and return soft partial matches. Searching with no number or a non-numerical search will
 * return all reservations in the database
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function searchByPhoneNumber(mobile_phone, signal) {
  const url = `${API_BASE_URL}/reservations?mobile_number=${mobile_phone}`;
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Updates the status of a reservation
 * @param reservation_Id
 * The reservation ID for the reservation
 * @param status
 * An object containing {status: "message"} that updates the status field of a reservation
 * @param signal
 * An optional abort signal
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function statusUpdate(reservationId, status, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(status),
    signal,
  };
  return await fetchJson(url, options)
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * List all tables.
 * @param signal
 * An optional abort signal
 * @returns {Promise<[tables]>}
 *  a promise that resolves to a possibly empty array of all tables from the database
 */

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables/`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Add a new table to the database.
 * @param newTable
 * An object containing the data of the new table
 * @param signal
 * An optional abort signal
 * @returns {Promise<[tables]>}
 *  a promise that resolves to a possibly empty array of all tables from the database
 */

export async function createTable(newTable, signal) {
  const url = `${API_BASE_URL}/tables/`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(newTable),
    signal,
  };
  console.log("post attempt:", url, options);
  return await fetchJson(url, options);
}

/**
 * Update a table to the database.
 * @param updatedTable
 * An object containing the data of the table to be updated, incloding the updatedTable.table_id
 * @param signal
 * An optional abort signal
 * @returns {Promise<[tables]>}
 *  a promise that resolves to a possibly empty array of all tables from the database
 */

export async function updateTable(updatedTable, signal) {
  const url = `${API_BASE_URL}/tables/${updatedTable.table_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedTable),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Delete a table from the database.
 * @param tableId
 * The table_id for the table
 * @param signal
 * An optional abort signal
 */

export async function deleteTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

/**
 * Occupy a table in the database.
 * @param tableId
 * The table_id for the table to be unseated. It's status field will be changed to "Occupied"
 * @param signal
 * An optional abort signal
 */

export async function seatTable(tableId, updatedTable, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedTable),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Unoccupy a table in the database.
 * @param tableId
 * The table_id for the table to be unseated. It's status field will be changed to "Free"
 * @param signal
 * An optional abort signal
 */

export async function freeTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

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

//Adds a new reservation to the reservations table

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

//retreieve a single reservation with a specified id property

export async function readReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}


//updates a single reservation

export async function updateReservation(updatedReservation, signal) {
  const url = `${API_BASE_URL}/reservations/${updatedReservation.id}`;
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

//deletes a reservation

export async function deleteReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

//list all reservations for a single date:

export async function readByDate(reservation_date, signal) {
  const url = `${API_BASE_URL}/reservations/ByDate?reservation_date=${reservation_date}`;
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}

//update a reservation's status:

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


//list all tables

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables/`);
  return await fetchJson(url, { headers, signal }, [])
}


//add a table

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

//update a table

export async function updateTable(updatedTable, signal) {
  const url = `${API_BASE_URL}/tables/${updatedTable.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedTable),
    signal,
  };
  return await fetchJson(url, options)
}

//delete a table

export async function deleteTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

//seat a party at a table

export async function seatTable(tableId, updatedTable, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedTable),
    signal,
  };
  return await fetchJson(url, options)
}

export async function freeTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

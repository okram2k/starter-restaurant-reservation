import React, { useEffect, useState } from "react";
import { readByDate, listTables, freeTable, statusUpdate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link, useParams } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import ReservationList from "../layout/ReservationList";
import TablesList from "./TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns a list of all reservations with today's date that
 * are still of status booked or seated along with all tables.
 */
function Dashboard({ date }) {
  const params = useParams();
  if (params.date) {
    date = params.date;
  }
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const reservation_date = date;
    const abortController = new AbortController();
    setReservationsError(null);
    readByDate(reservation_date, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);

    return () => abortController.abort();
  }
  //handle finish takes target data from a table button and processes clearing the table and finishing the reservation
  const handleFinish = async ({ target }) => {
    const abortController = new AbortController();
    const value = target.value;
    const result = window.confirm(
      `Is this table ready to seat new guests? This cannot be undone.`
    );
    if (result) {
      async function deleteData() {
        try {
          const activeTable = tables.filter(
            (table) => table.table_id === Number(value)
          );
          await freeTable(value, abortController.signal);
          await statusUpdate(
            activeTable[0].reservation_id,
            { status: "Finished" },
            abortController.signal
          );
          const output = await listTables(abortController.signal);
          const output2 = await readByDate(date, abortController.signal);
          setTables(output);
          setReservations(output2);
        } catch (error) {
          if (error.name === "AbortError") {
            // Ignore `AbortError`
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      deleteData();
    }
  };
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4> <br />
      </div>
      <div>
        <Link to={`/dashboard/${previous(date)}`} className="btn btn-dark">
          Previous
        </Link>{" "}
        &nbsp;
        <Link to={`/dashboard/${next(date)}`} className="btn btn-dark">
          Next
        </Link>{" "}
        &nbsp;
        <Link to={`/dashboard/`} className="btn btn-success">
          Today
        </Link>
      </div>
      <br />
      <div>
        <ReservationList reservations={reservations} />
      </div>
      <h4 className="mb-0">Tables:</h4> <br />
      <div>
        <TablesList tables={tables} handleFinish={handleFinish} />
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { readByDate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link, useParams, useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const params = useParams();
  if (params.date){
    date = params.date;
  }
  console.log(params.date, date)
  let isDate = new Date(date);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const reservation_date = date;
    const abortController = new AbortController();
    setReservationsError(null);
    readByDate( reservation_date, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    
    return () => abortController.abort();

  }
  //console.log(date, reservations);
  if (reservations.length > 0){
    
    //console.log(output, date);
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {isDate.toDateString()}</h4> <br />
        
        
      </div>
      <div>
          <Link to={`/dashboard/${previous(date)}`} className="btn btn-dark">Previous</Link> &nbsp;
          <Link to={`/dashboard/${next(date)}`} className="btn btn-dark">Next</Link> &nbsp;
          <Link to={`/dashboard/`} className="btn btn-success">Today</Link>
      </div>
      <br />
      <div className="row">
        {reservations.map((reservation)=>(
          <div className="col-sm-6">
            <div className="card text-white bg-dark mb-3">
              <div className="card-header">{reservation.reservation_time}</div>
              <div className="card-body">
                <h5 className="card-title">{reservation.first_name} {reservation.last_name}</h5>
                <p className="card-text">
                  date: {reservation.reservation_date} <br />
                  Mobile Number: {reservation.mobile_number}<br />
                  Party Size: {reservation.people}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
  } else {
    return (
      <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {isDate.toDateString()}</h4> <br />
        
        
      </div>
      <div>
          <Link to={`/dashboard/${previous(date)}`} className="btn btn-dark">Previous</Link> &nbsp;
          <Link to={`/dashboard/${next(date)}`} className="btn btn-dark">Next</Link> &nbsp;
          <Link to={`/dashboard/`} className="btn btn-success">Today</Link>
      </div>
      <br />
      No Reservations for this date.
      </main>
    )
  }
}

export default Dashboard;

import React from "react";
import { Link } from "react-router-dom";

const ReservationList = ({reservations}) => {
    if (reservations.length > 0 ){
        return (
        <div className="row">
            {reservations.map((reservation)=>(
              <div className="col-sm-6">
                <div className="card text-white bg-dark mb-3">
                  <div className="card-header"><h4>{reservation.first_name} {reservation.last_name}</h4></div>
                  <div className="card-body">
                    <h5 className="card-title">Time: {reservation.reservation_time}</h5>
                    <p className="card-text">
                      date: {reservation.reservation_date} <br />
                      Mobile Number: {reservation.mobile_number}<br />
                      Party Size: {reservation.people} <br /> 
                      <div data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status}</div> <br /> <br />
                      {(reservation.status === "Booked") ? <Link to={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-success">Seat</Link> : ""}
                      
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
    } else {
        return (
            <div class="alert alert-success" role="alert">
                No matching reservations.
            </div>
        )
    }
}

export default ReservationList;
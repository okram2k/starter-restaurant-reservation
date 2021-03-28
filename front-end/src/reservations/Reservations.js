import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReserveForm from "./ReserveForm"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Reservations({ date }) {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: date,
    reservation_time: "00:00:00",
    people: 1
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const abortController = new AbortController();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("Submitted:", formData);
    async function updateData() {
       try {
        await createReservation(formData, abortController.signal);
        console.log("updated");
        history.push(`/reservations?date=${formData.reservation_date}`);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
      } else {
          throw error;
        }
      }
    }
    updateData();
    return () => {
      console.log("post cleanup");
      abortController.abort();
    }
  };
  const handleChange = ({ target }) => {
    let value = target.value;

    if (target.name == "people" && target.value <= 0){
      value = 1;
    }
    setFormData({
      ...formData,
      [target.name]: value,
    });
    
    let isDate = new Date(formData.reservation_date);
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    console.log(formData.reservation_date, days[isDate.getUTCDay()]);
  };



  return (
    <main>
      <h1>Reservations</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <ReserveForm formData={formData} handleChange={handleChange} />
        <button type="button" onClick={() => history.goBack()} className="btn btn-secondary">Cancel</button> &nbsp;
        <button type="submit" className="btn btn-primary">Save</button>
        </form>
    </main>
  );
}

export default Reservations;

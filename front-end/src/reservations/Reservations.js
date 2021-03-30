import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationError from "./ReservationError"
import ReserveForm from "./ReserveForm"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Reservations({ date }) {
  const initialFormState = {
    first_name: " ",
    last_name: " ",
    mobile_number: " ",
    reservation_date: date,
    reservation_time: "10:30:00",
    people: 1
  };
  let errorCodes = [0,0,0];
  let errorMessages = ["Must select a future date", "Restaraunt is closed on Tuesdays", "Must select a time between 10:30AM - 9:30PM"]
  const [formData, setFormData] = useState({ ...initialFormState });
  const [errorList, setErrorList] = useState([]);
  const abortController = new AbortController();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("Submitted:", formData);
    async function updateData() {
       try {
        await createReservation(formData, abortController.signal);
        console.log("updated");
        history.push(`/dashboard/${formData.reservation_date}`);
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
    if (target.name == "reservation_date"){
      let isDate = new Date(value);
      let compareDate = new Date(date);
      if (isDate < compareDate){
        errorCodes[0] = 1;
      } else {
          errorCodes[0] = 0;
        
      }
      console.log(errorList);
      if (isDate.getUTCDay() == 2){
        errorCodes[1] = 1;
      } else {
        errorCodes[1] = 0;
      }
    }
    if (target.name == "reservation_time"){
      if (value >= "10:30" && value <= "21:30"){
        errorCodes[2] = 0;
      } else {
        errorCodes[2] = 1;
      }
    }
    let errList = [];
    errorCodes.forEach((code, index) =>{
      if (code == 1){
        errList.push(errorMessages[index]);
      }
    });
    setErrorList(errList);
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };




  return (
    <main>
      <h1>Reservations</h1>
      <div className="d-md-flex mb-3">
        <ReservationError errorList={errorList} />
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

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../utils/api";
import ReservationError from "./ReservationError";
import ReserveForm from "./ReserveForm";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 * The reservations form can be used for making new reservations
 * or updating existing ones..
 */
function Reservations({ date }) {
  const params = useParams();
  const reservation_id = params.reservation_id;
  //if this is from the route /reservations/:reservation_id/edit the
  //reservation_id will have a value, otherwise it will be undefined
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: date,
    reservation_time: "10:30:00",
    people: 1,
  };
  //the errorCodes array and errorMessages array have corresponding indexes. If
  //a value on the errorCodes array is set to 1 it will tell the checks to add
  //that corresponding errorMessage to the errorList.
  let errorCodes = [0, 0, 0];
  let errorMessages = [
    "Must select a future date",
    "Restaraunt is closed on Tuesdays",
    "Must select a time between 10:30AM - 9:30PM",
  ];
  const [formData, setFormData] = useState({ ...initialFormState });
  const [errorList, setErrorList] = useState([]);
  useEffect(() => {
    //if reservation_id is not undefined pull the reservation data to be updated from the api.
    if (reservation_id) {
      const abortController = new AbortController();
      async function loadData() {
        try {
          const output1 = await readReservation(
            reservation_id,
            abortController.signal
          );
          setFormData(output1);
          //filter out any tables that aren't free when we set the tables array.
        } catch (error) {
          if (error.name === "AbortError") {
            // Ignore `AbortError`
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      loadData();
    }
  }, [reservation_id]);
  const abortController = new AbortController();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    //check there are no outstanding errors before we attempt to send data
    if (errorList.length === 0) {
      async function updateData() {
        try {
          //if reservaiton_id isn't undefined we are updating a reservation, if it's undefined we are creating a new reservation
          if (reservation_id) {
            await updateReservation(formData, abortController.signal);
          } else {
            await createReservation(formData, abortController.signal);
          }
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
      };
    }
  };
  const handleChange = ({ target }) => {
    let value = target.value;
    //each time a value is change check to see if it is valid or not.
    //people must be a positive integer, if it is at 0 or below set it to 1
    if (target.name === "people" && target.value <= 0) {
      value = 1;
    }
    //reservation date must not be a date in the past
    if (target.name === "reservation_date") {
      let isDate = new Date(value);
      let compareDate = new Date(date);
      if (isDate < compareDate) {
        errorCodes[0] = 1;
      } else {
        errorCodes[0] = 0;
      }
      //reservation must not be on a tuesday
      if (isDate.getUTCDay() === 2) {
        errorCodes[1] = 1;
      } else {
        errorCodes[1] = 0;
      }
    }
    //reservation must be between 10:30am and 9:30pm
    if (target.name === "reservation_time") {
      if (value >= "10:30" && value <= "21:30") {
        errorCodes[2] = 0;
      } else {
        errorCodes[2] = 1;
      }
    }
    //if any of these errors are triggered, combine them into the error list and then push it to the errorList
    let errList = [];
    errorCodes.forEach((code, index) => {
      if (code === 1) {
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
        <button
          type="button"
          onClick={() => history.goBack()}
          className="btn btn-secondary"
        >
          Cancel
        </button>{" "}
        &nbsp;
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </main>
  );
}

export default Reservations;

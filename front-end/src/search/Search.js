import React, { useState } from "react";
import { searchByPhoneNumber } from "../utils/api";
//import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../layout/ReservationList";

/**
 * Defines the Search page.
 * This page will search the database by mobile_number and return
 * a list of reservations with matching numbers. The search api filters
 * out all non numbers or soft matches. Searching for a non number will
 * return all reservations.
 */
function Search() {
  const [reservations, setReservations] = useState([]);
  const initialFormState = {
    mobile_phone: "xxx-xxx-xxxx",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const abortController = new AbortController();
  const handleSubmit = (event) => {
    event.preventDefault();
    async function updateData() {
      try {
        const output = await searchByPhoneNumber(
          formData.mobile_phone,
          abortController.signal
        );
        setReservations(output);
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
      abortController.abort();
    };
  };
  const handleChange = ({ target }) => {
    let value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  return (
    <main>
      <h1>Search</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Search for a reservation by phone number</h4>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            id="mobile_phone"
            type="text"
            name="mobile_phone"
            onChange={handleChange}
            value={formData.mobile_phone}
            style={{ width: "150px" }}
            required
          />
          &nbsp; &nbsp;
          <button type="submit" className="btn btn-dark">
            Find
          </button>
        </form>
      </div>
      <br />
      <div>
        <ReservationList reservations={reservations} />
      </div>
    </main>
  );
}

export default Search;

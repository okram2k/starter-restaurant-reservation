import React, { useState } from "react";
import { searchByPhoneNumber } from "../utils/api";
//import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../layout/ReservationList"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Search() {
  const [reservations, setReservations] = useState([]);
  //const [reservationsError, setReservationsError] = useState(null);
  const initialFormState = {
    mobile_phone: "xxx-xxx-xxxx",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const abortController = new AbortController();
  const handleSubmit = (event) => {
      
    event.preventDefault();
      async function updateData() {
        console.log(formData.mobile_phone)
       try {
        const output = await searchByPhoneNumber(formData.mobile_phone, abortController.signal);
        setReservations(output);
        console.log("updated");
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
          />&nbsp; &nbsp;
        <button type="submit" className="btn btn-primary">Find</button>
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

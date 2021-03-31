import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TablesForm from "./TablesForm"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Tables({ date }) {
  const initialFormState = {
    table_name: "",
    capacity: 1,
    status: "Free"
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const abortController = new AbortController();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("Submitted:", formData);
    async function updateData() {
       try {
        await createTable(formData, abortController.signal);
        console.log("updated");
        history.push(`/dashboard`);
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

    if (target.name === "capacity" && target.value <= 0){
      value = 1;
    }
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };




  return (
    <main>
      <h1>Tables</h1>

      
      <form onSubmit={handleSubmit}>
        <TablesForm formData={formData} handleChange={handleChange} />
        <button type="button" onClick={() => history.goBack()} className="btn btn-secondary">Cancel</button> &nbsp;
        <button type="submit" className="btn btn-primary">Save</button>
        </form>
    </main>
  );
}

export default Tables;

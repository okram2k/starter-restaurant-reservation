import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TablesForm from "./TablesForm";

/**
 * Defines the tables page.
 * This page allows the creaiton of a new table. After adding a table it returns the user to the dashboard.
 */
function Tables() {
  //default a table_name of "Table Name", capacity of 1, and status "free" as a new table can't be occupied.
  const initialFormState = {
    table_name: "Table Name",
    capacity: 1,
    status: "Free",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const abortController = new AbortController();
  const history = useHistory();
  //upon submission, add table to the databse then return to the dashboard.
  const handleSubmit = (event) => {
    event.preventDefault();

    async function updateData() {
      try {
        await createTable(formData, abortController.signal);
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
      abortController.abort();
    };
  };
  const handleChange = ({ target }) => {
    let value = target.value;

    if (target.name === "capacity" && target.value <= 0) {
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

export default Tables;

import React from "react";

//this form is used for making or editing tables.

const TablesForm = ({ formData, handleChange }) => {
  return (
    <div>
      <label>Table Name:</label> <br />
      <input
        id="table_name"
        type="text"
        name="table_name"
        onChange={handleChange}
        value={formData.table_name}
        style={{ width: "50%" }}
        required
      />
      <br />
      <br />
      <label>Table Capacity (must be at least 1):</label> <br />
      <input
        id="capacity"
        type="number"
        name="capacity"
        onChange={handleChange}
        value={formData.capacity}
        style={{ width: "50%" }}
        required
      />
      <br />
      <br />
    </div>
  );
};
export default TablesForm;

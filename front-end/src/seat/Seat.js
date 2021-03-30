import React, { useEffect, useState } from "react";
import { readReservation, listTables, seatTable, statusUpdate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams, useHistory } from "react-router-dom";


function Seat() {
  const params = useParams();
  const reservation_id = params.reservation_id;


  const [reservation, setReservation] = useState([]);
  const [tables, setTables] = useState([]);
  const [seatingError, setSeatingError] = useState({message: "You must select a table"});
  const initialFormState = {
    table_id: "x",
  };
  const [formData, setFormData] = useState({ ...initialFormState });


  useEffect(() => {
    const abortController = new AbortController();
    async function loadData() {
       try {
        const output1 = await readReservation( reservation_id, abortController.signal);
        const output2 = await listTables(abortController.signal);
        setReservation(output1);
        //filter out any tables that aren't free when we set the tables array.
        setTables(output2.filter((table)=>table.status === "Free"));
       
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
});
const abortController = new AbortController();
const history = useHistory();
const handleSubmit = (event) => {
    
  event.preventDefault();
  if (seatingError === null){
  console.log("Submitted:", reservation_id);
  async function updateData() {
     try {
      await seatTable(formData.table_id, {reservation_id}, abortController.signal);
      await statusUpdate(reservation_id, {status: "Seated"}, abortController.signal);
      console.log("updated");
      history.push(`/dashboard/`);
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
}
};
const handleChange = ({ target }) => {
  let value = target.value;
  let matchedTable = tables.filter((table) => table.table_id === Number(value));
  if (value === "x"){
    setSeatingError({message: "You must select a table"});
  } else {
  if (reservation.people > matchedTable[0].capacity){
    setSeatingError({message: "That table does not have enough capacity"});
  } else {
    setSeatingError(null);
  }
} 
  setFormData({
    ...formData,
    [target.name]: value,
  });
};
  
  //console.log(tables);
    
  return (
    <main>
      <h1>Seat Party</h1>
      <ErrorAlert error={seatingError} />
      <div className="d-md-flex mb-3">
        <div className="col-sm-6">
            <div className="card text-white bg-dark mb-3">
            <div className="card-header"><h4>{reservation.first_name} {reservation.last_name}</h4></div>
            <div className="card-body">
                <h5 className="card-title">Time: {reservation.reservation_time}</h5>
                <p className="card-text">
                date: {reservation.reservation_date} <br />
                Mobile Number: {reservation.mobile_number}<br />
                Party Size: {reservation.people} <br /> <br />
                </p>
            </div>
            </div>
        </div>
        <div className="col-sm-6">
            <div className="card text-white bg-dark mb-3">
            <div className="card-header"><h4>Select a Table</h4></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                    <select
                    name="table_id"
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    value={formData.table_id}>
                        <option value="x">--- Select A Table ---</option>
                        {tables.map((table)=>( <option value={table.table_id}>{table.table_name} - {table.capacity}</option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <button type="button" onClick={() => history.goBack()} className="btn btn-secondary">Cancel</button> &nbsp;
                    <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
        
      </div>
      <br />
      <div>
    </div>
      
    </main>
  );
    
  
}

export default Seat;

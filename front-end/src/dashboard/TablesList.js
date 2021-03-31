import React from "react";
/*Takes an array of tables and lists them in 2 column cards with data. If the table is currently
occupied it displays the finish button which calls the handleFinish function, clearing the table
and setting that reservation to status "Finished"
*/
const TablesList = ({ tables, handleFinish }) => {
  if (tables.length > 0) {
    return (
      <div className="row">
        {tables.map((table) => (
          <div className="col-sm-6" key={table.table_id}>
            <div className="card text-white bg-dark mb-3">
              <div className="card-body">
                <h5 className="card-title">{table.table_name}</h5>
                <p className="card-text">
                  Table Capacity: {table.capacity} <br />
                  Status:{" "}
                  <span data-table-id-status={table.table_id}>
                    {table.status}
                  </span>
                  <br />
                  <br />
                  {table.status === "Occupied" ? (
                    <button
                      data-table-id-finish={table.table_id}
                      onClick={handleFinish}
                      value={table.table_id}
                      className="btn btn-success"
                    >
                      Finish
                    </button>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="alert alert-warning" role="alert">
        There are no tables saved
      </div>
    );
  }
};

export default TablesList;

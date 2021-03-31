import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

const ReservationError = ({ errorList }) => {
  if (errorList.length > 0) {
    return (
      <div>
        {errorList.map((message) => (
          <ErrorAlert error={{ message }} />
        ))}
      </div>
    );
  } else {
    return "";
  }
};
export default ReservationError;

import React from "react";

const ReserveForm = ({formData, handleChange}) => {

return (
    <div>
        <label>
            First Name:
        </label> <br />
            <input
            id="first_name"
            type="text"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            style={{ width: "50%" }}
            required
            />
        <br />
        <br />
        <label>
            Last Name:
        </label> <br />
            <input
            id="last_name"
            type="text"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
            style={{ width: "50%" }}
            required
            />
        <br />
        <br />
        <label>
            Mobile Number:
        </label> <br />
            <input
            id="mobile_number"
            type="text"
            name="mobile_number"
            onChange={handleChange}
            value={formData.mobile_number}
            style={{ width: "50%" }}
            required
            />
        <br />
        <br />
        <label>
            Date of Reservation:
        </label> <br />
            <input
            id="reservation_date"
            type="date"
            name="reservation_date"
            onChange={handleChange}
            value={formData.reservation_date}
            style={{ width: "50%" }}
            required
            />
        <br />
        <br />
        <label>
            Time of Reservation:
        </label> <br />
            <input
            id="reservation_time"
            type="time"
            name="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
            style={{ width: "50%" }}
            required
            />
        <br />
        <br />
        <label>
            Number of people in the party (must be at least 1):
        </label> <br />
            <input
            id="people"
            type="number"
            name="people"
            onChange={handleChange}
            value={formData.people}
            style={{ width: "50%" }}
            required
            />
        <br />
        <br />
    </div>
    )
};
export default ReserveForm;
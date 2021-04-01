# Capstone: Periodic Tables Restaurant Manager

This application was made as part of my capstone project for Thinkful Flex Software Engineering course. It is a reservation and table manager to be used by a restaurant that allows for the tracking of reservations as well as seating them to tables and updating their progress. This application was made to meet the specifications laid out by user stories provided by the Thinkful course. The project's base code and assignments can be viewed on its GitHub repository here: https://github.com/Thinkful-Ed/starter-restaurant-reservation

## Live Application

This application can be viewed and seen here: https://rrb-uild.vercel.app/

The backend API is currently running here: https://restaurant-reservation-back-end.vercel.app/

Both are hosted on [Vercel](https://vercel.com/home) with the SQL Database hosted by [ElephantSql](https://www.elephantsql.com/)

### API Paths

The `./back-end` folder contains all the code for the backend project.

The table below describes the existing files in the `./back-end` folder:

| API path                                                 | Function                                                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/reservations`                                          | GET: List all Reservations. POST: Create a new reservation                                                          |
| `/reservations/byDate?Reservation_date='YYYY-MM-DD'`     | GET: All reservations at a specific date (formated YYYY-MM-DD) ordered by reservation_time                          |
| `/reservations/:reservationId`                           | GET: Single reservation by Reservation_Id, PUT: Update a reservation by ReservationId, DELETE: Delete a reservation |
| `/reservations/:reservationId/status`                    | PUT: Update a reservation status as either "Booked", "Seated", "Finished", or "Cancelled"                           |
| `/tables`                                                | GET: List all Tables, POST: Create a new table (Note by table, referring to a table people eat at)                  |
| `/tables/:tablesID`                                      | GET: List a single table, PUT: Update a table, DELETE: Delete a table                                               |
| `/tables:tableId/seat`                                   | PUT: Updates a single table's status to "Occupied" Delete: Updates a single table's status to "Free"                |

### Application Usage:

The Restaurant Reservation Application has four main page. The Dashboard, the Search Page, New Reservation, and New Table

![The Dashboard](https://i.imgur.com/Kwen4CK.png)
The Dashboard allows a user to view the status of all tables in the restaurant as well as a list of all pending reservations for today's date. Reservations that are a status of "Finished" or "Cancelled" will not be displayed. Cancelling a reservation cannot be reserved and a warning message pops up before cancelling. Previous and Next buttons allow navigation to other dates while the Today button brings the user back to today's date. On each Reservation are the options to Seat, Edit or Cancel if the reservation has not already been seated. An occupied table will have an option to "Finish" Which will free the table and set the corresponding reservation to "Finished". Finishing a table cannot be reversed and a warning message pops up before it is completed.

![Seat Party](https://i.imgur.com/JfGWEB6.png)
After clicking on the Seat Party button a user has the option to seat the party at a table. Tables are listed in alphabetical order in the drop-down menu on the right. If the table is not large enough for the party an error message will appear at the top of the screen and the user will be prevented from saving the assignment. Cancelling returns the user back to the dashboard.

![Search](https://i.imgur.com/eMgnTJ7.png)
The search page allows a user to search for any reservations in the system by phone number. It uses a soft match and filters out all non-numeric entries while searching to avoid confusion with various phone number formats. As such searching for anything that does not contain a number (such as the default xxx-xxx-xxxx) will return a list of all reservations. From here reservations can be seated, edited, or cancelled.

![New Reservations](https://i.imgur.com/3zmmZha.png)
The Reservations page allows for the creation of new reservations (and is also the same layout for editing existing reservations). Reservations require a First and Last name, mobile number, date, time, and party size. The date must be today, or a future date and the time must be during the hours of operation between 10:30AM and an hour before closing at 9:30PM. Likewise, the restaurant is closed on Tuesdays so no reservations can be made on that date. An error message will be shown if the criteria are not met and will prevent a user from submitting the form. The page prevents a party size from being less than 1. After completing the form, the user will be taken to the dashboard set to the date the reservation was scheduled for.

![New Table](https://i.imgur.com/rSEGs5S.png)
New tables can be created at the Tables page. A table name and a capacity of at least 1 must be set before a table is saved to the system. Currently there is no framework in place to edit or remove tables so this page should be used with care.

## Technology Used in this project:

The front-end of this project was built in React, using Router, Hooks and Bootstrap styling CSS. An API was created at front-end/src/utils/api.js that handled all promises necessary to interact with the back-end API database.

The back-end of this project was built using Node.js, Knex, and Postgres. Utilizing restful APIs along with custom middleware to test received data met specified criteria including scheduling limitations on reservations, reservation party limits, and checking for no unexpected data fields. CORS was implemented to ensure the front-end app can connect to the back-end API.




## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your SQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Version 2.0

Several of the API calls as specified by the user requests could be combined into single calls to help speed up the app. Likewise the app is currently missing the ability to edit or delete tables and implementation of this could help significantly. The app could use two levels of users, an administrator that has access to delete reservations as well as adding or removing tables, while a normal user would only have access to the dashboard, search, and new reservation options.

Further options might also include adding multiple tables at once, more detailed reservation and table information, organizing tables based on restaurant layout, and tracking and assignment of servers to tables. A calendar built into the app could allow easier navigation of the dashboard and visualize how many reservations are listed for each day. A limit could be placed on how many reservations can be set for certain times to prevent the restaurant from being over booked.

const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

/**
 * Formats a Date object as YYYY-MM-DD.
 *
 * This function is *not* exported because the UI should generally avoid working directly with Date instance.
 * You may export this function if you need it.
 *
 * @param date
 *  an instance of a date object
 * @returns {string}
 *  the specified Date formatted as YYYY-MM-DD
 */
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

/**
 * Format a date string in ISO-8601 format (which is what is returned from PostgreSQL) as YYYY-MM-DD.
 * @param dateString
 *  ISO-8601 date string
 * @returns {*}
 *  the specified date string formatted as YYYY-MM-DD
 */
export function formatAsDate(dateString) {
  return dateString.match(dateFormat)[0];
}

/**
 * Format a time string in HH:MM:SS format (which is what is returned from PostgreSQL) as HH:MM.
 * @param timeString
 *  HH:MM:SS time string
 * @returns {*}
 *  the specified time string formatted as YHH:MM.
 */
export function formatAsTime(timeString) {
  return timeString.match(timeFormat)[0];
}

/**
 * Today's date as YYYY-MM-DD.
 * @returns {*}
 *  the today's date formatted as YYYY-MM-DD
 */
export function today() {
  return asDateString(new Date());
}

//the previous and next day code did not work for months with 31 days.
//I wouldn't have discovered this had I not been working on and around 3/31
//After some research I have replaced the functions with one that DOES.

/**
 * Subtracts one day to the specified date and return it in as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day prior to currentDate, formatted as YYYY-MM-DD
 
export function previous(currentDate) {
  const date = new Date(...currentDate.split("-"));
  date.setMonth(date.getMonth() - 1);
  date.setDate(date.getDate() - 1);
  return asDateString(date);
}
*/

export function previous(currentDate) {
  const date = new Date(currentDate+"T00:00:00");
  const next_date = new Date(date.getTime() - 24*60*60*1000);
  console.log(currentDate, date, next_date)
  return asDateString(next_date);
}

/**
 * Adds one day to the specified date and return it in as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day after currentDate, formatted as YYYY-MM-DD
 
export function next(currentDate) {
  const date = new Date(...currentDate.split("-"));
  date.setMonth(date.getMonth() - 1);
  date.setDate(date.getDate() + 1);
  return asDateString(date);
}
*/

export function next(currentDate) {
  const date = new Date(currentDate+"T00:00:00");
  const next_date = new Date(date.getTime() + 24*60*60*1000);
  console.log(currentDate, date, next_date)
  return asDateString(next_date);
}
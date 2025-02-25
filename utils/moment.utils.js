const moment = require('moment');

// Format current date in UTC (YYYY-MM-DD format)
const getCurrentDateTime = () => {
  return moment.utc().format('YYYY-MM-DD HH:mm:ss');
};

// Format current date in UTC (YYYY-MM-DD format)
const getCurrentDate = () => {
  return moment.utc().format('YYYY-MM-DD');
};

// Format current time in UTC (HH:mm:ss format)
const getCurrentTime = () => {
  return moment.utc().format('HH:mm:ss');
};

// Get current UTC timestamp (Unix timestamp)
const getCurrentTimestamp = () => {
  return moment.utc().unix();
};

// Format a given date in UTC
const formatDateTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(format);
};

// Format a given date in UTC
const formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment.utc(date).format(format);
};

// Add days to a UTC date
const addDays = (date, days) => {
  return moment.utc(date).add(days, 'days').format('YYYY-MM-DD');
};

// Add time (hours, minutes, seconds) to a UTC date/time
const addTime = (date, hours = 0, minutes = 0, seconds = 0) => {
  return moment
    .utc(date)
    .add(hours, 'hours')
    .add(minutes, 'minutes')
    .add(seconds, 'seconds')
    .format('YYYY-MM-DD HH:mm:ss');
};

// Subtract days from a UTC date
const subtractDays = (date, days) => {
  return moment.utc(date).subtract(days, 'days').format('YYYY-MM-DD');
};

// Check if a date is valid in UTC
const isValidDate = (date) => {
  return moment.utc(date).isValid();
};

// Get the difference in days between two UTC dates
const getDateDifference = (startDate, endDate) => {
  return moment.utc(endDate).diff(moment.utc(startDate), 'days');
};

// Parse a UTC date string and convert it to a date object
const parseDate = (dateString) => {
  return moment.utc(dateString).toDate();
};

module.exports = {
  getCurrentDateTime,
  getCurrentDate,
  getCurrentTime,
  getCurrentTimestamp,
  formatDateTime,
  formatDate,
  addDays,
  addTime,
  subtractDays,
  isValidDate,
  getDateDifference,
  parseDate,
};

const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
// constants
const { STATUS_CODES, RESPONSE_CODES } = require('./constants/constant');
// utils
const { failureResponse } = require('./utils/response.utils');

// Load environment variables
process.env.NODE_ENV = 'development';
const envFile = process.env.NODE_ENV === 'production' ? './env/.env.production' : './env/.env.development';

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(`Environment file ${envFile} not found. Using default environment variables.`);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRoute = require('./routes/index.route');
const departmentRoute = require('./routes/department.route');

app.use('/', indexRoute);
app.use('/department', departmentRoute);

// Global Routing Error Handler
app.use((req, res, next) => {
  return failureResponse(res, STATUS_CODES.NOT_FOUND, RESPONSE_CODES.ROUTE_NOT_FOUND, { message: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

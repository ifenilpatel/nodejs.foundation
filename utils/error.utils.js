class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.stack = new Error().stack;
  }
}

module.exports = AppError;

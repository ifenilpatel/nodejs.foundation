const successResponse = (res, statusCode, code, message, data = []) => {
  return res.status(statusCode).json({
    code: code,
    message: message,
    data: data,
  });
};

const failureResponse = (res, statusCode, code, error = []) => {
  return res.status(statusCode).json({
    code: code,
    data: error,
  });
};

module.exports = {
  successResponse,
  failureResponse,
};

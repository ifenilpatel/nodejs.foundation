const { body, validationResult } = require('express-validator');

const { STATUS_CODES, RESPONSE_CODES } = require('../constants/constant.js');
const { failureResponse } = require('../utils/response.utils.js');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => ({
      param: error.path,
      message: error.msg,
    }));

    return failureResponse(res, STATUS_CODES.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, messages);
  }
  next();
};

const pageIndex = body('pageIndex').isInt({ min: 1 }).withMessage('Page index must be a valid integer.');

const pageSize = body('pageSize').isInt({ min: 0 }).withMessage('Page index must be a valid integer or 0.');

module.exports = {
  validate,
  pageIndex,
  pageSize,
};

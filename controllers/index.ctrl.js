// constants
const { HTTP_STATUS, MESSAGES } = require('../constants/constant');
// utils
const { Success } = require('../utils/response.utils');

const fun_Index = (req, res, next) => {
  return Success(res, HTTP_STATUS.SUCCESS.OK, MESSAGES.SUCCESS, 'Welcome to node.authentication!');
};

module.exports = {
  fun_Index,
};

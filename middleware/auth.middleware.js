const { STATUS_CODE, STATUS_MESSAGE } = require('../constants/constants.js');
const { Error } = require('../utils/responseFormatter.utils.js');
const { decrypt } = require('../utils/security.utils.js');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return Error(res, STATUS_CODE.UNAUTHORIZED, STATUS_MESSAGE.UNAUTHORIZED);
    }

    const decoded = JSON.parse(decrypt(token));

    next();
  } catch (error) {
    return Error(res, STATUS_CODE.UNAUTHORIZED, STATUS_MESSAGE.UNAUTHORIZED);
  }
};

module.exports = {
  authenticateUser,
};

// config
const pool = require('../config/db.config.js');
// constants
const { STATUS_CODES, RESPONSE_CODES } = require('../constants/constant.js');
// model
const Department = require('../class/department.class.js');
// utils
const { successResponse, failureResponse } = require('../utils/response.utils.js');

const fun_selection = async (req, res) => {
  try {
    let strWhere = '';
    const departmentModel = new Department({});

    const strQuery = departmentModel.select(strWhere);
    pool.query(strQuery, function (error, result, fields) {
      if (error) {
        console.error(`Database error in fun_selection: ${error.message}`);
        return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.DATABASE_ERROR, {
          message: error.message,
        });
      }

      if (result.length === 0) {
        return failureResponse(res, STATUS_CODES.NOT_FOUND, RESPONSE_CODES.NO_DATA, {
          message: 'Department not found.',
        });
      }

      return successResponse(
        res,
        STATUS_CODES.SUCCESS,
        RESPONSE_CODES.SUCCESS,
        'Department fetched successfully',
        result,
      );
    });
  } catch (error) {
    console.error(`Error in fun_selection: ${error.message}`);
    return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.CODE_ERROR, {
      message: error.message,
    });
  }
};

const fun_selectById = async (req, res) => {
  try {
    let strWhere = '';
    let params = [];

    const departmentModel = new Department({ ...req.body });

    strWhere += ` and department_id = ? `;
    params.push(departmentModel.department_id);

    const strQuery = departmentModel.select(strWhere);
    pool.query(strQuery, params, function (error, result, fields) {
      if (error) {
        console.error(`Database error in fun_selectById: ${error.message}`);
        return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.DATABASE_ERROR, {
          message: error.message,
        });
      }

      if (result.length === 0) {
        return failureResponse(res, STATUS_CODES.NOT_FOUND, RESPONSE_CODES.NO_DATA, {
          message: 'Department not found.',
        });
      }

      return successResponse(
        res,
        STATUS_CODES.SUCCESS,
        RESPONSE_CODES.SUCCESS,
        'Department fetched successfully',
        result,
      );
    });
  } catch (error) {
    console.error(`Error in fun_selectById: ${error.message}`);
    return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.CODE_ERROR, {
      message: error.message,
    });
  }
};

const fun_selectAll = async (req, res) => {
  try {
    let strWhere = '';
    let limitClause = '';
    let params = [];

    const pageIndex = req.body.pageIndex;
    const pageSize = req.body.pageSize;

    const departmentModel = new Department({ ...req.body });

    strWhere += ' order by department_id desc ';

    if (pageSize != 'all') limitClause = ' limit ' + (pageIndex - 1) * pageSize + ',' + pageSize;

    let strQuery = departmentModel.select(strWhere + limitClause);
    let strCount = departmentModel.getcount(strWhere);

    const [dataResult] = await pool.promise().query(strQuery, params);
    const [countResult] = await pool.promise().query(strCount, params);

    if (dataResult.length === 0) {
      return failureResponse(res, STATUS_CODES.NOT_FOUND, RESPONSE_CODES.NO_DATA, { message: 'Department not found.' });
    }

    const result = {
      data: dataResult,
      count: countResult[0].count,
    };

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      RESPONSE_CODES.SUCCESS,
      'Department fetched successfully',
      result,
    );
  } catch (error) {
    console.error(`Error in fun_selectAll: ${error.message}`);
    return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.CODE_ERROR, {
      message: error.message,
    });
  }
};

const fun_insert = async (req, res) => {
  try {
    let strWhere = '';
    let params = [];

    const departmentModel = new Department({ ...req.body });

    let strQuery = departmentModel.select(` and department_id != 0 and title = ? `);
    params.push(departmentModel.title);

    const [strQueryResult] = await pool.promise().query(strQuery, params);

    if (strQueryResult.length > 0) {
      return failureResponse(res, STATUS_CODES.CONFLICT, RESPONSE_CODES.RECORD_EXISTS, {
        message: 'Department title is already exists.',
      });
    }

    const strInsertQuery = departmentModel.insert();
    pool.query(strInsertQuery.query, strInsertQuery.values, function (error, result, fields) {
      if (error) {
        console.error(`Database error in fun_insert: ${error.message}`);
        return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.DATABASE_ERROR, {
          message: error.message,
        });
      }

      return successResponse(res, STATUS_CODES.CREATED, RESPONSE_CODES.SUCCESS, 'Department created successfully', {
        insertId: result.insertId,
      });
    });
  } catch (error) {
    console.error(`Error in fun_insert: ${error.message}`);
    return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.CODE_ERROR, {
      message: error.message,
    });
  }
};

const fun_update = async (req, res) => {
  try {
    let strWhere = '';
    let params = [];

    const departmentModel = new Department({ ...req.body });

    let strQuery = departmentModel.select(` and department_id != ? and title = ? `);
    params.push(departmentModel.department_id);
    params.push(departmentModel.title);

    const [strQueryResult] = await pool.promise().query(strQuery, params);

    if (strQueryResult.length > 0) {
      return failureResponse(res, STATUS_CODES.CONFLICT, RESPONSE_CODES.RECORD_EXISTS, {
        message: 'Department title is already exists.',
      });
    }

    const strUpdateQuery = departmentModel.update();
    pool.query(strUpdateQuery.query, strUpdateQuery.values, function (error, result, fields) {
      if (error) {
        console.error(`Database error in fun_update: ${error.message}`);
        return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.DATABASE_ERROR, {
          message: error.message,
        });
      }

      if (result.affectedRows === 0) {
        return failureResponse(res, STATUS_CODES.NOT_FOUND, RESPONSE_CODES.NO_DATA, {
          message: 'No updates applied. The department data is unchanged.',
        });
      }

      return successResponse(res, STATUS_CODES.SUCCESS, RESPONSE_CODES.SUCCESS, 'Department updated successfully');
    });
  } catch (error) {
    console.error(`Error in fun_update: ${error.message}`);
    return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.CODE_ERROR, {
      message: error.message,
    });
  }
};

const fun_delete = async (req, res) => {
  try {
    let strWhere = '';
    let params = [];

    const departmentModel = new Department({ ...req.body });

    strWhere += ` and department_id = ? `;
    params.push(departmentModel.department_id);

    const strQuery = departmentModel.delete(strWhere);
    pool.query(strQuery, params, function (error, result, fields) {
      if (error) {
        console.error(`Database error in fun_selectById: ${error.message}`);
        return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.DATABASE_ERROR, {
          message: error.message,
        });
      }

      if (result.affectedRows === 0) {
        return failureResponse(res, STATUS_CODES.NOT_FOUND, RESPONSE_CODES.NO_DATA, {
          message: 'No department found with the given ID. Deletion failed.',
        });
      }

      return successResponse(res, STATUS_CODES.SUCCESS, RESPONSE_CODES.SUCCESS, 'Department deleted successfully.');
    });
  } catch (error) {
    console.error(`Error in fun_delete: ${error.message}`);
    return failureResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, RESPONSE_CODES.CODE_ERROR, {
      message: error.message,
    });
  }
};

module.exports = {
  fun_selection,
  fun_selectById,
  fun_selectAll,
  fun_insert,
  fun_update,
  fun_delete,
};

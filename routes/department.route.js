const express = require('express');
const router = express.Router();
// validators
const { pageIndex, pageSize, validate } = require('../validators/common.validator.js');
const department = require('../validators/department.validator.js');
// controllers
const departmentCtrl = require('../controllers/department.ctrl.js');

router.post('/v1/api_selection', (req, res) => {
  departmentCtrl.fun_selection(req, res);
});

router.post('/v1/api_selectbyid', [department.department_id, validate], (req, res) => {
  departmentCtrl.fun_selectById(req, res);
});

router.post('/v1/api_selectall', [pageIndex, pageSize, validate], (req, res) => {
  departmentCtrl.fun_selectAll(req, res);
});

router.post('/v1/api_insert', [department.insert, validate], (req, res) => {
  departmentCtrl.fun_insert(req, res);
});

router.post('/v1/api_update', [department.update, validate], (req, res) => {
  departmentCtrl.fun_update(req, res);
});

router.post('/v1/api_deletebyid', [department.department_id, validate], (req, res) => {
  departmentCtrl.fun_delete(req, res);
});

module.exports = router;

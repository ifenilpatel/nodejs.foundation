const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/index.ctrl.js');

router.get('/', (req, res, next) => {
  indexCtrl.fun_Index(req, res, next);
});

module.exports = router;

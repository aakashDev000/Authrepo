const express = require('express');
const {
  getRequestData,
  checkUserIsExistAndVerifyPassword,
  responseForAdminSignin,
} = require('./middleware');

const router = express.Router();

router.use(
  getRequestData,
  checkUserIsExistAndVerifyPassword,
  responseForAdminSignin
);

module.exports = router;

const express = require("express");
const {
  getRequestData,
  checkUserIsExistAndVerifyPassword,
  responseForAdminSignin,
  createToken,
} = require("./middleware");

const router = express.Router();

router.use(
  getRequestData,
  checkUserIsExistAndVerifyPassword,
  createToken,
  responseForAdminSignin
);

module.exports = router;

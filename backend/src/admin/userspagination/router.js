const express = require("express");
const {
  authVerify,
  getaccountData,
  getRequestData,
} = require("../../commonmiddleware");
const { getUserPagination } = require("./middleware");

const router = express.Router();

router.use(authVerify, getaccountData, getRequestData, getUserPagination);

module.exports = router;

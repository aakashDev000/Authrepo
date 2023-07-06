const express = require("express");
const {
  authVerify,
  getaccountData,
  getRequestData,
} = require("../../commonmiddleware");
const { adduserAgainstAdmin, checkExistingUser } = require("./middleware");

const router = express.Router();

router.use(
  authVerify,
  getaccountData,
  getRequestData,
  checkExistingUser,
  adduserAgainstAdmin
);

module.exports = router;

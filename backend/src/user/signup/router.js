const express = require("express");
const {
  hashPassword,
  checkExistingUser,
  storeUserSignupData,
} = require("./middleware");
const { getRequestData } = require("../../commonmiddleware");

const router = express.Router();

router.use(
  getRequestData,
  checkExistingUser,
  hashPassword,
  storeUserSignupData
);

module.exports = router;

const express = require("express");
const {
  getRequestData,
  hashPassword,
  storeAdminSignupData,
  checkExistingUser,
} = require("./middleware");

const router = express.Router();

router.use(
  getRequestData,
  checkExistingUser,
  hashPassword,
  storeAdminSignupData
);

module.exports = router;

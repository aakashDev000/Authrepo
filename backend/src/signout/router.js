const express = require("express");
const {
  getRequestData,
  removeTokenInDB,
  responseController,
} = require("./middleware");

const router = express.Router();

router.use(getRequestData, removeTokenInDB, responseController);

module.exports = router;

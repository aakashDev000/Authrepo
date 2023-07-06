const express = require("express");
const { authVerify, getaccountData } = require("./middleware");

const router = express.Router();

router.use(authVerify, getaccountData);

module.exports = router;

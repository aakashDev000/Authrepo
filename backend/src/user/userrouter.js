const express = require("express");
const router = express.Router();
const usersignup = require("./signup/router");
const usersignin = require("./signin/router");

router.use("/user/signup", usersignup);
router.use("/user/signin", usersignin);

module.exports = router;

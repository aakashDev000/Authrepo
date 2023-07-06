const express = require("express");
const adminSignupRouter = require("./signup/router");
const adminSigninRouter = require("./signin/router");
const addUser = require("./adduser/router");
const userpagination = require("./userspagination/router");

const router = express.Router();

router.post("/signup", adminSignupRouter);

router.post("/signin", adminSigninRouter);

router.post("/adduser", addUser);

router.get("/users/pagination", userpagination);

module.exports = router;

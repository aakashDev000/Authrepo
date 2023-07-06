const express = require("express");
const adminRouter = require("./admin/adminrouter");
const signout = require("./signout/router");
const docdata = require("./admin/getdocdata/router");
const router = express.Router();

router.use("/auth/admin", adminRouter);
router.use("/auth/signout", signout);
router.get("/docdata", docdata);

module.exports = router;

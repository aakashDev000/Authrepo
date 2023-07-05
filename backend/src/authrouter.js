const express = require("express");
const adminRouter = require('./admin/adminrouter')
const router = express.Router()

router.use('/auth/admin', adminRouter)

// router.use('/auth/user', userRouter)
// exports.module = router
module.exports = router
// exports.router
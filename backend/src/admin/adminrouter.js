const express = require("express");
const adminSignupRouter = require('./signup/router')
const router = express.Router()

router.post('/signup', adminSignupRouter)

// router.use('/auth/user', userRouter)

module.exports = router



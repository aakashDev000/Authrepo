const express = require("express");
const {getRequestData, hashPassword, storeAdminSignupData} = require('./middleware')

const router = express.Router()

router.use( getRequestData, hashPassword, storeAdminSignupData)

module.exports = router

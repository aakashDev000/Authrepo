const express = require('express');
const adminSignupRouter = require('./signup/router');
const adminSigninRouter = require('./signin/router');

const router = express.Router();

router.post('/signup', adminSignupRouter);

router.post('/signin', adminSigninRouter);

// router.use('/auth/user', userRouter)

module.exports = router;

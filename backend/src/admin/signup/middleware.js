const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require('uuid');
const { getMongodb } = require("../../../mongodb");

const getRequestData = (req, res, next) => {
console.log('req body', req.body);

if(req.method === 'POST') {
    const {data} = req.body
    res.locals.reqdata = data
}

next()
return;
}

const hashPassword =async (req, res, next) => {
    console.log('req data', res.locals.reqdata);

const {password} = res.locals.reqdata


const hasedPassword = await bcrypt.hash(password, 12);

res.locals.tempdata = {...res.locals.tempdata, hasedPassword}

next()
return;
}

const storeAdminSignupData = async (req, res, next) => {
const {email, username} = res.locals.reqdata;

const {hasedPassword} = res.locals.tempdata;

const accountid = uuidv4();

const adminid = uuidv4();


try {
    const mongodb = await getMongodb();

    await mongodb.collection('AdminLogin').insertOne({
        adminid,
        username,
        email,
        hasedPassword,
        accountid,
    })
} catch(error) {
    console.log('error in mongodb', error);
    res.status(400).send({message: 'Database error occured'});
    return;
}


res.status(201).send({message: 'Admin signed up successfully'});
return;

}

module.exports = {
    getRequestData,
    hashPassword,
    storeAdminSignupData
}
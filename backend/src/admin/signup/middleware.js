const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { getMongodb } = require("../../../mongodb");

function generateString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const getRequestData = (req, res, next) => {
  console.log("req body", req.body);

  if (req.method === "POST") {
    const { data } = req.body;
    res.locals.reqdata = data;
  }

  next();
  return;
};

const checkExistingUser = async (req, res, next) => {
  const { username, email, password } = res.locals.reqdata;

  if (!username || !email || !password) {
    res.status(400).send({ status: 400, data: "please fill the all details" });
    return;
  }

  const checkEmail = email.endsWith("@gmail.com");

  if (!checkEmail) {
    res.status(400).send({ status: 400, data: "Please Enter valid Email" });
    return;
  }

  const mongodb = await getMongodb();

  const data = await mongodb.collection("AdminLogin").findOne({ email });

  if (data) {
    res.status(400).send({ status: 400, data: "Already You Signedup" });
    return;
  }

  next();
  return;
};

const hashPassword = async (req, res, next) => {
  console.log("req data", res.locals.reqdata);

  const { password } = res.locals.reqdata;

  const hasedPassword = await bcrypt.hash(password, 12);

  res.locals.tempdata = { ...res.locals.tempdata, hasedPassword };

  next();
  return;
};

const storeAdminSignupData = async (req, res, next) => {
  const { email, username } = res.locals.reqdata;

  const { hasedPassword } = res.locals.tempdata;

  try {
    const accountid = generateString(12);

    const adminid = uuidv4();

    const mongodb = await getMongodb();

    await mongodb.collection("AdminLogin").insertOne({
      adminid,
      username,
      email,
      password: hasedPassword,
      accountid,
      isadmin: true,
      cretedat: new Date(),
    });
  } catch (error) {
    console.log("error in mongodb", error);
    res.status(400).send({ status: 400, data: "Database error occured" });
    return;
  }

  res.status(201).send({ status: 201, data: "Admin signed up successfully" });
  return;
};

module.exports = {
  getRequestData,
  hashPassword,
  storeAdminSignupData,
  checkExistingUser,
};

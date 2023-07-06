const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { getMongodb } = require("../../../mongodb");

const getRequestData = (req, res, next) => {
  console.log("req body", req.body);

  if (req.method === "POST") {
    const { data } = req.body;
    res.locals.reqdata = data;
  }

  next();
  return;
};

const checkUserIsExistAndVerifyPassword = async (req, res, next) => {
  console.log("req data", res.locals.reqdata);

  const { password, email } = res.locals.reqdata;

  if (!email) {
    res.status(400).send({ status: 400, data: "Please Enter Your email" });
  }

  if (!password) {
    res.status(400).send({ status: 400, data: "Please Enter Your Password" });
  }

  let data;

  try {
    const mongoDB = await getMongodb();

    data = await mongoDB.collection("AdminLogin").findOne(
      { email },
      {
        projection: {
          _id: 0,
          hashedpassword: "$password",
          accountid: 1,
          adminid: 1,
          isadmin: 1,
        },
      }
    );
  } catch (error) {
    console.log("error in mongodb", error);
    res.status(400).send({ status: 400, data: "Database error occured" });
    return;
  }

  if (!data) {
    res.status(400).send({ status: 400, message: "Admin Account not found" });
  }

  const { hashedpassword, accountid, adminid, isadmin } = data;

  const isMatch = await bcrypt.compare(password, hashedpassword);

  if (!isMatch) {
    res.status(400).send({ status: 400, data: "Password not match" });
    return;
  }

  res.locals.tempdata = { ...res.locals.tempdata, accountid, adminid, isadmin };

  next();
  return;
};

const createToken = async (req, res, next) => {
  const authtoken = uuidv4() + uuidv4();
  const { accountid, isadmin } = res.locals.tempdata;
  const { email } = res.locals.reqdata;

  try {
    const expirydate = new Date().setDate(new Date().getDate() + 1);
    const mongoDB = await getMongodb();

    await mongoDB.collection("AuthToken").insertOne({
      authtoken,
      accountid,
      isadmin,
      email,
      expirydate,
      cretedat: new Date(),
    });

    res.locals.tempdata = { ...res.locals.tempdata, authtoken };

    next();
    return;
  } catch (error) {
    console.log("error in mongodb", error);
    res.status(400).send({ status: 400, data: "Database error occured" });
    return;
  }
};

const responseForAdminSignin = async (req, res, next) => {
  const { accountid, isadmin, authtoken } = res.locals.tempdata;

  res
    .status(200)
    .send({ status: 200, data: { accountid, isadmin, authtoken } });
  return;
};

module.exports = {
  getRequestData,
  checkUserIsExistAndVerifyPassword,
  responseForAdminSignin,
  createToken,
};

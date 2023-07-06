const bcrypt = require("bcrypt");
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

const checkExistingUser = async (req, res, next) => {
  try {
    const { accountid, email, password } = res.locals.reqdata;

    console.log("reqdata", res.locals.reqdata);

    if (!accountid || !email || !password) {
      res
        .status(400)
        .send({ status: 400, data: "please fill the all details" });
      return;
    }

    const checkEmail = email.endsWith("@gmail.com");

    if (!checkEmail) {
      res.status(400).send({ status: 400, data: "Please Enter valid Email" });
      return;
    }

    const mongodb = await getMongodb();

    const userdata = await mongodb
      .collection("Users")
      .findOne({ email, accountid });

    if (!userdata) {
      res.status(400).send({
        status: 400,
        data: "User Account not Found contact your admin",
      });
      return;
    }

    const { signedup } = userdata;

    if (signedup) {
      res.status(400).send({ status: 400, data: "Already you signedup" });
      return;
    }

    res.locals.tempdata = { ...res.locals.tempdata, userdata };

    next();
    return;
  } catch (error) {
    console.log("error********", error);
    res
      .status(400)
      .send({ status: 400, data: "Error Occured in get Userdata" });
    return;
  }
};

const hashPassword = async (req, res, next) => {
  console.log("req data", res.locals.reqdata);

  const { password } = res.locals.reqdata;

  const hasedPassword = await bcrypt.hash(password, 12);

  res.locals.tempdata = { ...res.locals.tempdata, hasedPassword };

  next();
  return;
};

const storeUserSignupData = async (req, res, next) => {
  const { email, accountid } = res.locals.reqdata;

  const {
    hasedPassword,
    userdata: { userid, adminid, username },
  } = res.locals.tempdata;

  try {
    const mongodb = await getMongodb();

    await mongodb.collection("UserLogin").insertOne({
      adminid,
      username,
      email,
      userid,
      password: hasedPassword,
      accountid,
      isadmin: false,
      cretedat: new Date(),
    });

    await mongodb.collection("Users").updateOne(
      { adminid, accountid, userid },
      {
        $set: {
          signedup: true,
        },
      }
    );

    res.status(201).send({ status: 201, data: "User signed up successfully" });
    return;
  } catch (error) {
    console.log("error in mongodb", error);
    res.status(400).send({ status: 400, data: "Database error occured" });
    return;
  }
};

module.exports = {
  getRequestData,
  hashPassword,
  storeUserSignupData,
  checkExistingUser,
};

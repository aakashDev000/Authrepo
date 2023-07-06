const { getMongodb } = require("../mongodb");

exports.authVerify = (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];

    const split = authorization.split(" ");

    if (split[0] !== "Bearer") {
      res.status(401).send({ status: 400, data: "Invalid Token" });
      return;
    }

    if (split[1]) {
      res.locals = { ...res.locals, authtoken: split[1] };
      next();
      return;
    }

    res.status(401).send({ status: 401, data: "Invalid Token" });
    return;
  } catch (error) {
    console.log("error****", error);
    res
      .status(401)
      .send({ status: 401, data: "Error Occured in Token Validation" });
    return;
  }
};

exports.getaccountData = async (req, res, next) => {
  try {
    const { authtoken } = res.locals;

    const mongoDB = await getMongodb();

    const tokendata = await mongoDB
      .collection("AuthToken")
      .findOne(
        { authtoken, expirydate: { $gt: new Date() } },
        { projection: { _id: 0, adminid: 1, email: 1, isadmin: 1 } }
      );

    if (!tokendata) {
      res.status(401).send({ status: 400, data: "Token Expired" });
      return;
    }

    const { adminid, email, isadmin } = tokendata;

    const accoundata = await mongoDB
      .collection("AdminLogin")
      .findOne(
        { adminid },
        { projection: { _id: 0, accountid: 1, username: 1 } }
      );

    if (!accoundata) {
      res.status(401).send({ status: 400, data: "Token Expired" });
      return;
    }

    res.locals.tempdata = {
      ...res.locals.tempdata,
      accoundata: { ...accoundata, email, isadmin, adminid },
    };

    next();
    return;
  } catch (error) {
    console.log("error*****", error);
    res.status(400).send({ status: 400, data: "Error Occured in DB" });
    return;
  }
};

exports.getRequestData = (req, res, next) => {
  console.log("req body", req.body);

  if (req.method === "POST") {
    const { data } = req.body;
    res.locals.reqdata = data;
  }

  if (req.method === "GET") {
    const query = req.query;
    res.locals.reqdata = query;
  }

  next();
  return;
};

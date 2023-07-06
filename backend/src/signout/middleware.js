const { getMongodb } = require("../../mongodb");

const getRequestData = (req, res, next) => {
  if (req.method === "POST") {
    const { data } = req.body;
    res.locals.reqdata = data;
  }

  next();
  return;
};

const removeTokenInDB = async (req, res, next) => {
  const { reqdata } = res.locals;
  try {
    const { authtoken } = reqdata;
    const mongoDB = await getMongodb();

    await mongoDB.collection("AuthToken").deleteMany({ authtoken });

    next();
    return;
  } catch (error) {
    console.log("error********", error);
    res.status(400).send({ status: 400, data: "Database error occured" });
    return;
  }
};

const responseController = (req, res, next) => {
  res.status(200).send({ status: 200, data: "signout successfully" });
  return;
};

module.exports = { getRequestData, removeTokenInDB, responseController };

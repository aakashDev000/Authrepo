const { getMongodb } = require("../../../mongodb");

exports.getUserPagination = async (req, res, next) => {
  try {
    const { accoundata } = res.locals.tempdata;

    const { adminid } = accoundata;

    const mongoDB = await getMongodb();

    const userlist = await mongoDB
      .collection("Users")
      .find(
        { adminid },
        {
          projection: {
            _id: 0,
            adminid: 0,
            accountid: 0,
          },
        }
      )
      .toArray();

    if (!userlist) {
      res.status(400).send({ status: 400, data: "User List Not Found" });
      return;
    }

    res.status(201).send({ status: 200, data: userlist });
    return;
  } catch (error) {
    console.log("error*****", error);
    res.status(400).send({ status: 400, data: "Error Occured in DB" });
    return;
  }
};

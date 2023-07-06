require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./src/authrouter");
const userRouter = require("./src/user/userrouter");

const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(router);

const port = 5000;

app.listen(port, () => {
  console.log(`server started port ${port}`);
});

router.use("/api/v1", authRouter, userRouter);

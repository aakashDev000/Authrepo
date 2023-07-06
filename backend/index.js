const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./src/authrouter");

const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000, () => {
  console.log("server started");
});

router.use("/api/v1", authRouter);

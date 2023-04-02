const express = require("express");
const { connection } = require("./db");
const { UserRouter } = require("./route/user.route");
const { PostRouter } = require("./route/post.route");
const { authenticate } = require("./middleware/authenticate.middleware");

var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

app.use("/user", UserRouter);
app.use("/posts", PostRouter);
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(1111, async () => {
  try {
    await connection;
    console.log("Connected to db");

  } catch (error) {
    console.log(error);
  }
  console.log("server is running at port 1111");
});

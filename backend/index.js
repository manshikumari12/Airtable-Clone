const express = require("express");
const { connection } = require("./db");
const { UserRouter } = require("./route/user.route");
const { PostRouter } = require("./route/post.route");
const  {router} =require("./route/favorite.router")
const {todoRouter} =require("./route/todo.router")
// const {formRouter} = require("./route/form.router")
const passport = require("passport")



const app = express();
const cors=require("cors")
app.use(cors())
const {googleAuthentication}=require("./googleauth")

app.use(express.json());


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signup', session:false }), googleAuthentication )

app.use("/user", UserRouter);
app.use("/post", PostRouter);
app.use("/todo",todoRouter)
app.use("/fav", router);


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
  console.log("server is running at port ");
});

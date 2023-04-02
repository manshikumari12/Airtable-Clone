const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("ok");
});

UserRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city , is_married } = req.body;
  const user = await UserModel.find({ email });
  if (user.length <= 0) {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something went Wrong", error: err.message });
        } else {
          const user = new UserModel({
            name,
            email,
            password: hash,
          });
          await user.save();
          res.send({ msg: "New user has been registered" });
        }
      });
    } catch (error) {
      res.send({ msg: "Something went Wrong", error: error.message });
    }
  } else {
    res.send({ msg: "User already exist, please login" });
  }
});

// UserRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.find({ email });
//     if (user.length > 0) {
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (result) {
//           const token = jwt.sign({ userId: user[0]._id }, "mannu");
//           res.send({ msg: "Logged in ", token: token });
//         }
//       });
//     } else {
//       res.send({ msg: "Wrong credentials" });
//     }
//   } catch (error) {
//     res.send({ msg: "Something went wrong", error: error.message });
//   }
// });

UserRouter.post("/login", async ( req , res ) => {
  const {email , password}= req.body


  try{
      const users = await UserModel.findOne({email})
      if( users ){
          bcrypt.compare(password,users.password,(err,result)=>{
              if( result ){
                  res.status(200).send({"msg":"Login Sucssesfull","token":jwt.sign({"userID":users._id},"mannu")})
              }else{
                  res.status(200).send("Login Failed")
              }
          })
      }

  }catch(error){
      res.status(400).send({"msg":"pranay"})

      console.log(error);
  }


})

module.exports = {
  UserRouter,
};

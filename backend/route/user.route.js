const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const UserRouter = express.Router();

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "manshisbp@gmail.com",
//       pass: "manshi@420",
//     },
//   });

UserRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
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

UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                // result == false
                if(result){
                    res.status(200).send({"msg":"Login Successfully","token":jwt.sign({"userid":user._id},"mannu",{ expiresIn: '1h' }),"name":user.name,"email":user.email})
                }else{
                    res.status(400).send({"msg":"Invalid Credentials"})
                }
            });
        }else{
            res.status(400).send({"msg":"Invalid Credentials"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = {
  UserRouter,
};

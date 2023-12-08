const mongoose = require("mongoose");
const env= require("dotenv")
env.config()

const connection = mongoose.connect("mongodb+srv://manshisbp:manshi@cluster0.vildgct.mongodb.net/taskmain?retryWrites=true&w=majority");

module.exports = {
  connection,
};
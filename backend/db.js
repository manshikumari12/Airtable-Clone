const mongoose = require("mongoose");
const env= require("dotenv")
env.config()

const connection = mongoose.connect("mongodb://127.0.0.1:27017/to");

module.exports = {
  connection,
};
const mongoose = require("mongoose");
const env= require("dotenv")
env.config()

const connection = mongoose.connect(process.env.mongoURL);

module.exports = {
  connection,
};
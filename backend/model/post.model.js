const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
 
  name : String,
notes : String,
assign : String,
status: String,
});

const PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel,
};
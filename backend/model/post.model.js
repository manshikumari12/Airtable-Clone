const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: String,


  assign: String,
  completed: { type: Boolean, default: false },
});

const PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel,
};

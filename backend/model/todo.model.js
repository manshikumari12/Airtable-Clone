const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
 
 date: Date,
    todo: String,
    time: String



});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = { todoModel};
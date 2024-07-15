const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  active :{
    type : Boolean,
    required : true
  },
  priority :{
    type : Number,
    required : true
  }
});

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  todos: [todoSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

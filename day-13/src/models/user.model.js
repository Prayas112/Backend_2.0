const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "user already exists"],
    required: [true, "username required"],
  },
  email: {
    type: String,
    unique: [true, "emailalready exists"],
    required: [true, "email is required"],
  },
  password:{
    type:String,
    required:[true, "password is required"],
  },
  bio:String,
  userimage:{
    type:String,
    default:"",
  }
});

const usermodel = mongoose.model("users", userSchema)

module.exports = usermodel

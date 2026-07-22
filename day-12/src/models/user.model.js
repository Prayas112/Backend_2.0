const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "user already exists"],
    required:[true,"name is required"],
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    required:[true,"email is required"],

  },
  password: {
    type: String,
    required:[true,"password is required"]
  },
  bio: {
    type: String,
  },
  userprofile: {
    type: String,
  },
});

const usermodel = mongoose.model("users", userSchema);

module.exports = usermodel;

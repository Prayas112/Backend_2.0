const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
   
  },
});

const usermodel = mongoose.model("users", userSchema)

module.exports = usermodel
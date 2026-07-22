const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user name is already exist"],
        required:[true,"username required"]
    },
    email:{
        type:String,
        unique:[true, "email already exists"],
        required:[true, "email required"]
    },
    password:String,
    bio:String,

})

const usermodel = mongoose.model("users",userSchema)


module.exports = usermodel
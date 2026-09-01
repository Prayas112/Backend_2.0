const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    bio:String
}
    
)


const usermodel = mongoose.model("users", userSchema)

module.exports = usermodel
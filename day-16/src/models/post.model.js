const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:String,
    imgurl:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

const postmodel = mongoose.model("posts",postSchema)

module.exports = postmodel
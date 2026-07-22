const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
    caption:{
        type: String,
    },
    imgurl:{
        type: String,
        required:[true, "imgurl is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
})

const postmodel = mongoose.model("posts",postSchema)

module.exports = postmodel


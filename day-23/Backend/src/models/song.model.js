const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required: true
    },
    posterurl:{
       type:String,
       required: true
    },
    title:{
        type:String,
        required: true
    },
    mood:{
        type: String,
        enum:{
            values:["sad", "happy", "surprised"],
            message:"enum this is"
        }
    }
})

const songmodel = mongoose.model("songs", songSchema)

module.exports = songmodel
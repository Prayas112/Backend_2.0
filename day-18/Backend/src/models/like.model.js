const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:true
    },
    user:{
        type:String,
        required:true
    }

},
{
    timestamps:true
}
)

likeSchema.index({post:1, user:1}, {unique:true})


const likemodel = mongoose.model("likes",likeSchema)

module.exports = likemodel
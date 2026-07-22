const postmodel = require("../models/post.model")
const jwt = require("jsonwebtoken")
const Imagekit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostcontroller(req,res){
     
   

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),
    "file"),
    fileName:"test"
    })

    const post = await postmodel.create({
        caption:req.body.caption,
        imgurl:file.url,
        user:req.user.id

    })
   
    
     
    res.status(200).json({
        message:"post created successfully",
        post
    })

}

 async function getpostcontroller(req,res){
      
    const userId = req.user.id
    const posts = await postmodel.find({
        user:userId,
      
    })
    res.status(200).json({
        message:"post fetched successfully",
        posts
    })
 }

 async function getpostdetailscontroller(req,res){

    const userId = req.user.id
    const postId = req.params.postId
    const post = await postmodel.findById(postId)
    
    
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isvalidpostid = post.user.toString() === userId
    if(!isvalidpostid){
        return res.status(404).json({
            message:"forbidden content"
        })
    }
    res.status(200).json({
        message:"post fetched successfully",
        post
    })
 }

module.exports = {
    createpostcontroller,
    getpostcontroller,
    getpostdetailscontroller
}
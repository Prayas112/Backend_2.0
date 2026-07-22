const postmodel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");


const imagekit = new Imagekit({
privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostcontroller(req, res){
    console.log(req.body , req.file);
  
    const token = req.cookies.token
   
    if(!token){
        return res.status(404).json({
            message:"token is not provided"
        })
    }
   
    let decoded = null
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      
      
    } catch (err) {
      return res.status(401).json({
        message: "user not authorized",
      });
    }
    
    const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),
    "file"),
    fileName:"test",
    folder:"insta-clone"
    
    })
   

    const post = await postmodel.create({
        caption: req.body.caption,
        imgurl:file.url,
        user:decoded.id
    })
    res.status(201).json({
        message:"post created successfully",
        post

    })
   
}

module.exports = {
    createpostcontroller
}
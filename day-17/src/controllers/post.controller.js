const postmodel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likemodel = require("../models/like.model")
const imagekit = new Imagekit({
  privateKey: process.env.PRIVATE_IMAGEKIT_KEY,
});

async function createpostcontroller(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
  });

  const posts = await postmodel.create({
    caption: req.body.caption,
    imgurl: file.url,
    user: req.user.id,
    
  });

  res.status(200).json({
    message: "post created successfully",
    posts,
  });
}

async function getpostcontroller(req, res) {
  const userid = req.user.id;
 
  const post = await postmodel.find({
    user:userid,
    
    
  });
  if (!post) {
    return res.status(404).json({
      message: "post not found !",
    });
  }

  res.status(200).json({
    message:"post fetched ",
    post
  })
}

async function getpostdetailscontroller(req,res){
  
    const userid = req.user.id
    const postid = req.params.postid
    
    

    const post = await postmodel.findById(postid)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const validuser = post.user.toString() === userid

    if(!validuser){
        return res.status(403).json({
            message:"forbidden content"
        })
    }
    res.status(200).json({
        message:"post fetched",
        post
    })
}

async function likepostcontroller(req,res){
    const username = req.user.user
    const postid = req.params.postid
    console.log(postid);
    
    const post = await postmodel.findById(postid)
    console.log(post);
    
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const alradyliked = await likemodel.findOne({
      post: postid,
      user: username,
    });

    if(alradyliked){
        return res.status(409).json({
            message:"already liked"
        })
    }
    const like = await likemodel.create({
        post:postid,
        user:username
    })
    res.status(200).json({
        message:"post like successfully",
        like
    })
}

module.exports = {
  createpostcontroller,
  getpostcontroller,
  getpostdetailscontroller,
  likepostcontroller
};

const postodel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs/index.js");
const { toFile } = require("@imagekit/nodejs/index.js");
const postmodel = require("../models/post.model");
const likemodel = require("../models/like.model");

const imagekit = new Imagekit({

  privatekey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createpostcontroller(req, res) {
   

    
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
  });


    console.log("IMAGEKIT UPLOAD SUCCESS:", file.url);
  const post = await postmodel.create({
    caption: req.body.caption,
    imgurl: file.url,
    user: req.user.id,
  });
   

  res.status(200).json({
    message: "post created",
    post,
  });

  
}

async function getpostcontroller(req, res) {
  const userid = req.user.id;
  const post = await postmodel.find({
    user: userid,
  });
  if (!userid) {
    return res.status(404).json({
      message: "post not found",
    });
  }
  res.status(200).json({
    message: "post fetched successfully",
    post,
  });
}

async function getpostdetailscontroller(req, res) {
  const userid = req.user.id;
  const postid = req.params.postid;

  const post = await postmodel.findById(postid);
  console.log("JWT USER ID:", userid);
  console.log("POST USER ID:", post.user);
  console.log("POST USER ID STRING:", post.user.toString());
  console.log("POST ID:", postid);
  if (!post) {
    return res.status(404).jaon({
      message: "post not found",
    });
  }
  const isvaliduser = (await post.user.toString()) === userid;
  if (!isvaliduser) {
    return res.status(409).json({
      message: "forbidden content",
    });
  }
  res.status(200).json({
    message: "post feteched",
    post,
  });
}

async function likepostcontroller(req, res) {
  const username = req.user.user;
  const postid = req.params.postid;

  const post = await postmodel.findById(postid);

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }
  const alreadylike = await likemodel.findOne({
    user: username,
    post: postid,
  });
  if (alreadylike) {
    return res.status(409).json({
      message: "post already liked",
    });
  }
  const like = await likemodel.create({
    user: username,
    post: postid,
  });
  res.status(200).json({
    message: "post liked successfully ",
    like,
  });
}

async function unlikepostcontroller(req, res){
    const username = req.user.user;
    const postid = req.params.postid;

    const isliked  = await likemodel.findOne({
      post:postid,
      user: username
    })

    if(!isliked){
      res.status(400).json({
        message:"post didn't like"
      })
    }

    await likemodel.findByIdAndDelete({_id: isliked._id})

      return res.status(200).json({
        message: "post un liked successfully.",
      });
}

const followmodel = require("../models/follow.model");

async function feedpostcontroller(req, res) {
  const user = req.user;

  const posts = await postmodel.find().populate("user").lean();

  const updatedPosts = await Promise.all(
    posts.map(async (post) => {
      // LIKE CHECK
      const isliked = await likemodel.findOne({
        user: user.user,
        post: post._id,
      });

      post.isLiked = Boolean(isliked);

      // FOLLOW CHECK
      const isfollowing = await followmodel.findOne({
        follower: user.user,
        followee: post.user.username,
      });

      post.isFollowing = Boolean(isfollowing);

      return post;
    }),
  );

  res.status(200).json({
    message: "post fetched successfully",
    posts: updatedPosts,
  });
}
module.exports = {
  createpostcontroller,
  getpostcontroller,
  getpostdetailscontroller,
  likepostcontroller,
  unlikepostcontroller,
  feedpostcontroller
};

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
    return res.status(404).json({
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

module.exports = {
  createpostcontroller,
  getpostcontroller,
  getpostdetailscontroller,
  likepostcontroller,
};

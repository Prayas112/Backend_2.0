const postmodel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new Imagekit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });

async function createpostcontroller(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.token;

  if (!token) {
    return res.status(408).json({
      message: "not found",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(404).json({
      message: "invalid token",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
  });

  const post = await postmodel.create({
    caption: req.body.caption,
    imgurl: file.url,
    user: decoded.id,
  });

  res.status(200).json({
    message: "post fetched successfully",
    post,
  });
}

async function getpostcontroller(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(408).json({
      message: "not found",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(404).json({
      message: "invalid token",
    });
  }

  const userId = decoded.id;
  const posts = await postmodel.find({
    user: userId,
  });
  res.status(200).json({
    message: "post fetched .",posts
  });
}

async function getpostdetailscontroller(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(408).json({
      message: "not found",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
  const userId = decoded.id;
  const postId = req.params.postId;
 
  const post = await postmodel.findById(postId);
  
  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }
  const isvaliduser = post.user.toString() === userId;
  if (!isvaliduser) {
    return res.status(403).json({
      message: "forbidden content",
    });
  }
  res.status(200).json({
    message: "post feteched successfully",
    post
  });
}

module.exports = {
  createpostcontroller,
  getpostcontroller,
  getpostdetailscontroller,
};

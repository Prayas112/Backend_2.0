const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userregistercontroller(req, res) {
  const { username, email, password, bio } = req.body;

  const isalreadyregister = await usermodel.findOne({
    $or: [{ username }, { email }],
  });

  if (isalreadyregister) {
    return res.status(409).json({
      message: "user already registerd",
    });
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await usermodel.create({
    username,
    email,
    password: hash,
    bio,
  });

  const token = jwt.sign(
    {
      id: user._id,
      user:user.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user registered successfully",
    user: {
      username,
      email,
      bio,
    },
  });
}

async function userlogincontroller(req,res){
  const {username, email, password, bio} = req.body

  const user = await usermodel.findOne({
    $or:[{username},{email}]
  })
  if(!user){
    return res.status(409).json({
        message:"user not found !"
    })
  }
  const ispassvalid = await bcrypt.compare(password, user.password)


  if(!ispassvalid){
    return res.status(409).json({
        message:"password is wrong"
    })
  }

  const token = jwt.sign(
    {
      id: user._id,
      user:user.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in  successfully",
    user: {
      username:user.username,
      email:user.email,
      bio:user.bio
    },
  });
}

module.exports = {
  userregistercontroller,
  userlogincontroller
};

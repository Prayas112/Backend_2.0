const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registercontroller(req, res) {
  const { username, email, password, bio, userimage } = req.body;

  const useralreadyexists = await usermodel.findOne({
    $or: [{ username }, { email }],
  });
  if (useralreadyexists) {
    return res.status(409).json({
      message:
        "" +
        (useralreadyexists.email === email
          ? "email already exists"
          : "username already exists"),
    });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await usermodel.create({
    username,
    email,
    password: hash,
    bio,
    userimage,
  });

  const token = await jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "user registered successfully",
    user: {
      name: user.username,
      email: user.email,
      bio: user.bio,
      userimage: user.userimage,
    },
  });
}

async function logincontroller (req, res){
  const { username, email, password, bio, userimage } = req.body;
  const user = await usermodel.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    return res.status(409).json({
      message: "user does not exist",
    });
  }
  const passisvalid = await bcrypt.compare(password, user.password);
  if (!passisvalid) {
    return res.status(409).json({
      message: "password is wrong",
    });
  }
  const token = await jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "logged in successfully",
    user: {
      name: user.username,
      email: user.email,
      bio: user.bio,
      userimage: user.userimage,
    },
  });
};


module.exports ={
    registercontroller,
    logincontroller
}
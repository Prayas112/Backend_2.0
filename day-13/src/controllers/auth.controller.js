const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function registercontroller(req, res) {
  const { name, email, password, bio, userimage } = req.body;

  const isuseralreadyexists = await usermodel.findOne({
    $or: [{ name }, { email }],
  });
  if (isuseralreadyexists) {
    return res.status(201).json({
      message:
        "" +
        (isuseralreadyexists.email == email
          ? "email exists"
          : "username exists"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await usermodel.create({
    name: name,
    email: email,
    password: hash,
    bio: bio,
    userimage: userimage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_URI,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "register successfully",
    user: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      userimage: user.userimage,
    },
  });
}

async function logincontroller(req, res) {
  const { name, email, password, bio, userimage } = req.body;

  const user = await usermodel.findOne({
    $or: [{ name: name }, { email: email }],
  });

  if (!user) {
    return res.status(409).json({
      message: "user not defined",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const ispassword = hash === user.password;
  if (!ispassword) {
    res.status(409).json({
      message: "password incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_URI,
    {
      expiresIn: "1d",
    },
  );

  res.status(200).json({
    message: "user logged in successfully",
    user: {
      name: user.name,
      email:user.email,
      bio: user.bio,
      userimage: user.userimage,
    },
  });
}

module.exports = {
  registercontroller,
  logincontroller,
};

const express = require("express");
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authrouter = express.Router();
const crypto = require("crypto");

authrouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isuseralreadyexists = await usermodel.findOne({ email });

  if (isuseralreadyexists) {
    res.status(409).json({
      messsage: "user already exists",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await usermodel.create({
    name,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "user registered successfully",
    user,
    token,
  });
});
authrouter.post("/protected", (req, res) => {
  console.log(req.body);
});

authrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "email is invalid",
    });
  }
  const checkvalidpassword =
    user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!checkvalidpassword) {
    return res.status(404).json({
      message: "invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.status(201).json({
    message: "logged in successfully",
  });
});

module.exports = authrouter;

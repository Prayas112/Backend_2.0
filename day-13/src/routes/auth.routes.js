const express = require("express");
const usercontroller = require("../controllers/user.controller")
const authrouter = express.Router();

authrouter.post("/register",usercontroller.registercontroller );

  authrouter.post("/login", usercontroller.logincontroller );



module.exports = authrouter;

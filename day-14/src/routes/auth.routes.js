const express = require("express")
const authrouter = express.Router()
const usercontroller = require("../controllers/user.controller")

authrouter.post("/register",usercontroller.createusercontroller)
authrouter.post("/login",usercontroller.userlogincontroller)
module.exports = authrouter
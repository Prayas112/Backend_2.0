const express = require("express")
const authrouter = express.Router()
const usercontroller = require("../controllers/auth.controller")

authrouter.post("/register",usercontroller.userregistercontroller )
authrouter.post("/login", usercontroller.userlogincontroller)

module.exports = authrouter
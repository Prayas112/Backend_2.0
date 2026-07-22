const express = require("express")
const authrouter = express.Router()
const usercontroller = require("../controllers/auth.controller")


authrouter.post("/register",usercontroller.userrgistercontroller)
authrouter.post("/login",usercontroller.userlogicontroller)
module.exports = authrouter
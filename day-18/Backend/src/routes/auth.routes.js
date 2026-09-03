const express = require("express")
const authrouter = express.Router()
const authcontroller = require("../controllers/auth.controller")
const verifyuser = require("../middlewares/user")
authrouter.post("/register", authcontroller.userregistercontroller )
authrouter.post("/login", authcontroller.userlogincontroller)
authrouter.get("/get-me",verifyuser, authcontroller.getmecontroller )
module.exports = authrouter
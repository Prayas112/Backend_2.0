const express = require("express")
const followrouter = express.Router()
const usercontroller = require("../controllers/follow.controller")
const verifyuser = require("../middlewares/user")

followrouter.post("/follow/:username",verifyuser, usercontroller.followcontroller)
followrouter.post("/unfollow/:username",verifyuser, usercontroller.unfollowcontroller)
module.exports = followrouter
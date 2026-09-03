const express = require("express")
const followrouter = express.Router()
const verifyuser = require("../middlewares/user")
const follow = require("../controllers/follow.controller")

followrouter.post("/follow/:username",verifyuser,follow.followcontroller)
followrouter.post ("/unfollow/:username", verifyuser,follow.unfollowcontroller)

module.exports = followrouter
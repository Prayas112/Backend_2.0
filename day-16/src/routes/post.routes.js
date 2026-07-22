const express = require("express")
const postrouter = express.Router()
const postcontroller = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")


postrouter.post("/",upload.single("image"), identifyUser, postcontroller.createpostcontroller)
postrouter.get("/", identifyUser, postcontroller.getpostcontroller)
postrouter.get("/details/:postId",identifyUser,postcontroller.getpostdetailscontroller)
module.exports = postrouter
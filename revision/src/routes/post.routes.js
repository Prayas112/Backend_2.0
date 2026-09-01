const express = require("express")
const postrouter = express.Router()
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const postcontroller = require("../controllers/post.controller")
const verifyuser = require("../middlewares/user")


postrouter.post("/",verifyuser, upload.single("image"), postcontroller.createpostcontroller)
postrouter.get("/",verifyuser,postcontroller.getpostcontroller)
postrouter.get("/details/:postid",verifyuser, postcontroller.getpostdetailscontroller)
postrouter.post("/likes/:postid",verifyuser, postcontroller.likepostcontroller )

module.exports = postrouter
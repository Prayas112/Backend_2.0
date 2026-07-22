const express = require("express")
const postrouter = express.Router()
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const postcontroller = require("../controllers/post.controller")

postrouter.post("/",upload.single("image"),postcontroller.createpostcontroller)
postrouter.get("/",postcontroller.getpostcontroller)
postrouter.get("/details/:postId",postcontroller.getpostdetailscontroller)

module.exports= postrouter
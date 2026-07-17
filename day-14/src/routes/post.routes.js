const express = require("express")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const postcontroller = require("../controllers/post.controller")
const postrouter = express.Router()

postrouter.post("/",upload.single("image"),postcontroller.createpostcontroller)

module.exports = postrouter



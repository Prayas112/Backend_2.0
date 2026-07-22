const express = require("express")
const postrouter = express.Router()
const multer = require("multer")
const postcontroller = require("../controllers/post.controller")
const upload = multer({storage:multer.memoryStorage()})

postrouter.post("/",upload.single("image"), postcontroller.createpostcontroller)

module.exports = postrouter


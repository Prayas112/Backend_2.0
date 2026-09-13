const express = require("express")
const upload = require("../middlewares/upload.middleware")
const songcontroller = require("../controllers/song.controller")

const router = express.Router()

router.post("/", upload.single("song"), songcontroller.uploadsong);
router.get("/", songcontroller.getsong)

module.exports = router

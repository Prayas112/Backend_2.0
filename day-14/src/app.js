const express = require("express")
const cookie = require("cookie-parser")
const authrouter = require("./routes/auth.routes")
const postrouter = require("../src/routes/post.routes")

const app = express()
app.use(cookie())
app.use(express.json())
app.use("/api/auth",authrouter)
app.use("/api/posts",postrouter)

module.exports = app

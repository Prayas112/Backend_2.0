const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const authrouter = require("./routes/auth.routes")
const postrouter = require("./routes/post.routes")
const followrouter = require("./routes/follow.routes")

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authrouter)
app.use("/api/posts",postrouter)
app.use("/api/user",followrouter)

module.exports = app
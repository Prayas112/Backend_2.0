const express = require("express")
const authrouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const postrouter = require("./routes/post.routes")
const app = express()

app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authrouter)
app.use("/api/posts",postrouter)




module.exports = app
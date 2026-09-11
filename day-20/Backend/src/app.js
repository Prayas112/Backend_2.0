const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()

app.use(express.json())
app.use(cookieParser())

const router = require("./routes/auth.routes")
app.use("/api/auth", router)


module.exports = app
const dotenv = require("dotenv").config()
const app = require("./src/app")

const mongoose = require("mongoose")
 const db = require("./src/config/database")





app.listen(3000, ()=>{
    console.log("server is running");
    
})
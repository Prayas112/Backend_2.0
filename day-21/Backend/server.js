require("dotenv").config()
const app = require("./src/app")
const dns = require("./src/dns/dns")
const connectToDb = require("./src/config/database")

connectToDb()



app.listen(3000, ()=>{
    console.log("server is running");
    
})
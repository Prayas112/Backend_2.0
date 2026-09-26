require("dotenv").config()
const app = require("./src/app")
const connectedToDB = require("./src/config/database")
const dns = require("./src/dns/dns")

connectedToDB()




app.listen(3000, ()=>{
    console.log("server is running");
    
})
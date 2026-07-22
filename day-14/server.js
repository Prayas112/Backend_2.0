require("dotenv").config()
const app = require("./src/app")
const dns = require("./src/dns/dns")
const connectedTODB = require("./src/config/database")

connectedTODB()


app.listen(3000, ()=>{
    console.log("server is running");
    
})
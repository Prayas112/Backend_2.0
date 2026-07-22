require("dotenv").config()
const app = require("./src/app")
const connectTODB =require("./src/config/database")
const dns = require("./src/dns/dns")


connectTODB()
app.listen(3000, ()=>{
    console.log("server is running");
    
})
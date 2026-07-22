const mongoose = require("mongoose")

 function connectedTODB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db");
        
    })
 }

 module.exports = connectedTODB
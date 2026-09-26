const mongoose = require("mongoose")

function connectedToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("db connected");
        
    })
}


module.exports = connectedToDB
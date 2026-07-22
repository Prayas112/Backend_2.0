const mongoose = require("mongoose")


async function connectTODB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database is connected");
        
    })
}

module.exports = connectTODB
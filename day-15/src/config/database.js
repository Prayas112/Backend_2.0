const mongoose = require("mongoose")


async function connectTODB(){
    await mongoose.connect(process.env.MONGO_URI)
     .then(()=>{
        console.log("db connected");
        
     })
}

module.exports = connectTODB
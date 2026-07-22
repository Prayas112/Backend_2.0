const mongoose = require("mongoose")


function connectTODB(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("connected to db");
    
  })

}
module.exports = connectTODB
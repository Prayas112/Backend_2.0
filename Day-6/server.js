const app = require("./src/app")

const mongoose = require("mongoose");

const private = require("./src/dns")


function connectToDb() {
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://prayas:4fxd96pHsH1zBOPt@cluster0.mwrhjjk.mongodb.net/Day-6"
  )
  .then(() => {
    console.log("Connected to database")
  })
  .catch((err) => {
    console.error("MongoDB Error:", err)
  });
}
connectToDb();

app.listen(3000,()=>{
    console.log("server is running");
    
})



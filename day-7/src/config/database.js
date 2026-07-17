const mongoose = require("mongoose")
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"])

function connectToDb() {
  mongoose
    .connect(
      process.env.MONGO_URI,
    )
    .then(() => {
      console.log("db connected");
    });
}
const db = connectToDb()


module.exports = db

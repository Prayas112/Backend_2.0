require("dotenv").config();
const app = require("./src/app");
const dns = require("./src/dns/dns");
const connectTODB = require("./src/config/database");

connectTODB();

app.listen(3000, () => {
  console.log("server is running");
});

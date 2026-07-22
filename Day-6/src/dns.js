const dns = require("dns");
const private = dns.setServers(["8.8.8.8", "8.8.4.4"])


module.exports = private

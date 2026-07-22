const dns = require("dns")
const Module = require("module")
dns.setServers(["8.8.8.8", "8.8.4.4"])

module.exports = dns
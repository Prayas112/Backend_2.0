const {Router} = require("express")
const router =Router();
const authcontroller = require("../controllers/auth.controller")
const verifyuser = require("../middlewares/user.verify")



router.post("/register",authcontroller.registercontroller)
router.post("/login", authcontroller.logincontroller)
router.get("/getme",verifyuser, authcontroller.getmecontroller)
router.get("/logout",authcontroller.logoutcontroller)

module.exports = router
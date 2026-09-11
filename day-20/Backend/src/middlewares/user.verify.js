const jwt = require("jsonwebtoken")


 function verifyuser(req, res, next){
    const token = req.cookies.token

    if(!token){
        res.status(400).json({
            message:"token not found"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
    }
    catch(err){
        res.status(404).json({
            message:"unauthorizes access"
        })
    }
  
 }

 module.exports = verifyuser
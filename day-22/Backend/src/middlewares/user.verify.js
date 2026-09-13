const jwt = require("jsonwebtoken")
const redis = require("../config/Cache")

 async function verifyuser(req, res, next){
    const token = req.cookies.token

    if(!token){
        res.status(400).json({
            message:"token not found"
        })
    }

    const istokenblacklist = await redis.get(token)
    if(istokenblacklist){
        res.status(401).json({
            message:"token invalid"
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
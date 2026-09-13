const jwt = require("jsonwebtoken")
const redis = require("../config/Cache")

 async function verifyuser(req, res, next){

    console.log("COOKIES:", req.cookies);
    const token = req.cookies.token


    console.log("TOKEN:", token);

    if(!token){
       return res.status(401).json({
            message:"token not found"
        })
    }

    const istokenblacklist = await redis.get(token)


    console.log("REDIS BLACKLIST VALUE:", istokenblacklist);


    if(istokenblacklist){
      return res.status(401).json({
            message:"token invalid"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

           console.log("DECODED:", decoded);
    req.user = decoded
    next()
    }
    catch(err){
          console.log("JWT ERROR:", err);
       return res.status(404).json({
            message:"unauthorizes access"
        })
    }
  
 }

 module.exports = verifyuser
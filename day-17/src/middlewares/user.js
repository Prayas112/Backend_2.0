const jwt = require("jsonwebtoken")



async function verifyuser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(409).json({
            message:"token not find"
        })
    }

    let decoded;
    try{
        decoded = jwt.verify(token , process.env.JWT_SECRET)
    }
    catch(err){
    return res.status(409).json({
        message:"user not authorized"
    })
    }
    req.user = decoded
    next()
}

module.exports = verifyuser
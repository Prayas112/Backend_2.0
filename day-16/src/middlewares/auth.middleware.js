const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
     const token = req.cookies.token
        if(!token){
            return res.status(404).json({
                message:"user not found ..."
            })
        }
        let decoded;
        try{
            decoded = jwt.verify(token , process.env.JWT_SECRET)
        }
        catch(err){
        return res.status(404).json({
            message:"token invalid"
         })
        }

        req.user = decoded,
        next()
}

module.exports = identifyUser
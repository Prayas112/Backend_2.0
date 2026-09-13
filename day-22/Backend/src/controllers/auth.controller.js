const usermodel = require("../models/auth.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const redis = require("../config/Cache")

async function registercontroller(req, res) {
     console.log("POSTMAN BODY:", req.body);
    const{username, email, password} = req.body
  console.log("BODY:", req.body);
    const already = await usermodel.findOne({
        $or:[{email}, {username}]
    })
    if(already){
        res.status(400).json({
            message:"user already registered"
        })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await usermodel.create({
        
            username,
            email,
            password:hash
        
    })

    const token = jwt.sign({
        id:user._id
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

res.cookie("token", token)

res.status(200).json({
    message:"user registered successfully.",
    user:{
        username:user.username,
        email:user.email
    }
})
    
}

async function logincontroller(req, res) {
    const {email, username, password} = req.body

    const user = await usermodel.findOne({
        $or:[{email}, {username}]
    }).select("+password")
    if(!user){
        res.status(400).json({
            message:"user not found"
        })
    }
    const ispass = await bcrypt.compare(password, user.password)

    if(!ispass){
        res.status(400).json({
            message:"pass is wrong"
        })
    }

    const token = jwt.sign({
        id:user._id

    },
process.env.JWT_SECRET,
{expiresIn:"1d"})

res.cookie("token", token);

res.status(200).json({
  message: "user logged in successfully.",
  user: {
    user: user.username,
    email: user.email,
  },
});
}

async function getmecontroller(req, res){
    const user = await usermodel.findById(req.user.id)
    res.status(200).json({
        message:"user fetched successfully.",
        user
    })
}

async function logoutcontroller(req, res){
    const token =req.cookies.token
    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "EX", 60*60)

    res.status(200).json({
        message:"logged out successfully."
    })
}

module.exports = {registercontroller,
    logincontroller,
    getmecontroller,
    logoutcontroller
}
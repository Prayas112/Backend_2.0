const usermodel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function userregistercontroller(req,res) {

    const {email, username, password, bio} = req.body
    
    const isuseralreadyexist = await usermodel.findOne({
        $or: [{email}, {username}]
    })

    if(isuseralreadyexist){
        res.status(404).json({
            message:"user already registered"
        })
    }
    
    const hash = await bcrypt.hash(password, 10)

    const user = await usermodel.create({
        username,
        email,
        password: hash,
        bio
    })

    const token = jwt.sign({
        id:user._id,
        user:user.username
    },
process.env.JWT_SECRET,
{
    expiresIn: "1d"
})
  res.cookie = ("token", token)

  res.status(404).json({
    message:"user registered successfully",
    user:{
        username: user.username,
        email:user.email,
        bio:user.bio
    }
  })
}

async function userlogincontroller(req,res) {
    const {email, username, password, bio} = req.body

    const user = await usermodel.findOne({
        $or: [{email}, {username}]
    })
    if(!user){
        res.status(409).json({
            message:"user no found"
        })
    }
    const ispassvalid = await bcrypt.compare(password, user.password)
   if(!ispassvalid){
    res.status(409).json({
        message:"password is wrong"
    })
   }

   const token = jwt.sign({
    id:user._id,
    user:user.username
   },
process.env.JWT_SECRET,
{
    expiresIn:"1d"
})

 res.cookie("token", token)
res.status(404).json({
    message:"user loggedin successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio
    }
})
   
}

module.exports = {
    userregistercontroller,
    userlogincontroller
}
const usermodel =require("../models/user.model")
const bcrypt = require("bcryptjs")
const { json } = require("express")
const jwt = require("jsonwebtoken")

async function userrgistercontroller(req,res){
  const {username, email, password, bio} = req.body

  const userdetails = await usermodel.findOne({
    $or:[{username}, {email}]
  })
  if(userdetails){
    res.status(408).json({
        message:"user already exist !"
    })
  }
  const hash = await bcrypt.hash(password ,10)
  const user = await usermodel.create({
    username,
    email,
    password:hash,
    bio
  })

  const token = await jwt.sign({
    id:user._id
  },
process.env.JWT_SECRET,{
    expiresIn:"1d"
})
  res.cookie("token", token)

  res.status(200).json({
    message:"user registered successfully", 
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio
    }
  })

}

async function userlogicontroller(req,res){
   const{username, email, password, bio} = req.body

   const user = await usermodel.findOne({
    $or:[{username:username}, {email:email}]
   })
   if(!user){
    return res.status(408).json({
        message:"user not found !"
    })
   }

   const ispass = await bcrypt.compare(password, user.password)
   if (!ispass) {
     return res.status(408).json({
       message: "password is wrong",
     });
   }
   
   const token = await jwt.sign({
    id:user._id
   },
process.env.JWT_SECRET,{
    expiresIn:"1d"
})
res.status(200).json({
    message:"user login successfully", 
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio
    }
})
 
}  
module.exports = {
    userrgistercontroller,
    userlogicontroller
}
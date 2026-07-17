const express = require("express")
const usermodel = require("../models/user.model")
const authrouter = express.Router()
const jwt = require("jsonwebtoken")

authrouter.post("/register", async(req,res)=>{
    const {name,email,password} = req.body

    const isuseralreadyexists = await usermodel.findOne({email})
    if(isuseralreadyexists){
        return res.status(400).json({
            message:"this user already exist"
        })
    }

     

   const user = await usermodel.create({
    name , email , password

    
   })
     const token = jwt.sign(
       {
         id: user._id,
         email: user.email,
       },
       process.env.JWT_SECRET
     )
    res.cookie("jwt-token",token)

   res.status(201).json({
    message:"user details submitted successfully",user, token
   })
})

module.exports = authrouter
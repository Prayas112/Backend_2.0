const usermodel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function userregistercontroller(req,res){
    const {username, email, password, bio } = req.body

    const isuseralreadyexist = await usermodel.findOne({
        $or:[{username},{email}]
    })
    if(isuseralreadyexist){
        return res.status(409).json({
            message: "user already exist"
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await usermodel.create({
        username,
        email,
        password:hash,
        bio
    })
   
    const token = jwt.sign({
        id:user._id
    },
process.env.JWT_SECRET, {expiresIn:"1d"})
   res.cookie("token",token)

   res.status(200).json({
    message:"user registered successfully",
    user
   })

}


async function userlogincontroller(req,res){
    const { username, email, password, bio} = req.body

    const user = await usermodel.findOne({
        $or:[{username:username},{email:email}]
    })
    if(!user){
        return res.status(408).json({
            message:"user not found"
        })
    }
    const ispassword = await bcrypt.compare(password, user.password) 
    if(!ispassword){
        return res.status(408).json({
            message:"pssword is wrong"
        })
    }
       const token = jwt.sign(
         {
           id: user._id,
         },
         process.env.JWT_SECRET,
         { expiresIn: "1d" },
       );
       res.cookie("token", token);

       res.status(200).json({
         message: "user logged in successfully",
         user,
       });

}

module.exports = {
    userregistercontroller,
    userlogincontroller
}
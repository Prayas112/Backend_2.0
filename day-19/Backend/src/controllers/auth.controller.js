const usermodel = require("../models/auth.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function userregistercontroller (req,res){
    const {username, email, password, bio} = req.body

    const allreadyexist = await usermodel .findOne({
        $or:[{username}, {email}]
    })
    if(allreadyexist){
        return res.status(202).json({
            message:"user already registered"
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
        user:user._id,
        email:user.email
    },
process.env.JWT_SECRET,
{
    expiresIn:"1d"
}
)

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

async function userlogincontroller(req,res){
    const {username, email, password, bio} = req.body

    const user = await usermodel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select("+password");
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const ispass = await bcrypt.compare(password, user.password)
   if(!ispass){
    return res.status(404).json({
        message:"pass is wrong"
    })
   }
   
   const token = jwt.sign(
     {
       id: user._id,
       user:user.username,
     },
     process.env.JWT_SECRET,
     {
       expiresIn: "1d",
     },
   );
  res.cookie("token", token)
  res.status(200).json({
    message:"user logged in successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio
    }
  })

}

async function logoutcontroller(req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout successful",
  });
}

async function getmecontroller(req,res){
    const userid = req.user.id
    const user = await usermodel.findById(userid)
    res.status(200).json({
     user:{
        username:user.username,
        email:user.email,
        bio:user.bio
     }
    })
}

module.exports = {
    userregistercontroller,
    userlogincontroller,
    getmecontroller,
    logoutcontroller
}
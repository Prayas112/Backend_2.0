const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
async function createusercontroller(req, res) {
  const { username, email, password, bio } = req.body;

  const isuser = await usermodel.findOne({
    $or: [
      {username},
      {email},
    ],
  });
   if (isuser){
    return res.status(409).json({
        message: "user already exists" +" " + "with this"+ " " +(isuser.email == email ? "email ":"username")
    })
   }
   const hash = await bcrypt.hash(password, 10)
   const user = await usermodel.create({
    username,
    email,
    password:hash,
    bio,
   })

   const token = await jwt.sign({
    id:user._id,
   },
process.env.JWT_SECRET,{
    expiresIn:"1d"
})

 res.cookie("token",token)

 res.status(200).json({
    message:"registered successfully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        id:user._id
    }
 })

}

async function userlogincontroller(req, res) {
    const {username, email, password, bio} = req.body

    const user = await usermodel.findOne({
        $or:[{username:username},{email:email}]
    })
    if(!user){
        return res.status(409).json({
            message:"user not found"
        })
    }
    const ispasswordisvalid = await bcrypt.compare(password, user.password)
    if(!ispasswordisvalid){
        return res.status(409).json({
            message:"password is not valid"
        })
    }

    const token = await jwt.sign({
        id:user._id
    },
process.env.JWT_SECRET,
{expiresIn:"1d"})

 res.cookie("token", token);

 res.status(200).json({
   message: "login successfuly",
   user: {
     username: user.username,
     email: user.email,
     bio: user.bio,
   },
 });
}


module.exports = {
    createusercontroller,
    userlogincontroller
}

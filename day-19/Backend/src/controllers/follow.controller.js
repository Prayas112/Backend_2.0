const followmodel = require("../models/follow.model")
const usermodel = require("../models/auth.model")

async function followcontroller(req,res){
 const followerusername = req.user.user
 const followeeusername = req.params.username

 if(followeeusername === followerusername){
    return res.status(400).json({
        message:"you cannot follow yourself"
    })
 }
 const followeeexist = await usermodel.findOne({
 username : followeeusername
 })

 if(!followeeexist){
    return res.status(400).json({
        message:"user not find"
    })
 }
 const isalready = await followmodel.findOne({
    follower:followerusername,
    followee:followeeusername
 })
 if(isalready){
    return res.status(400).json({
        message:`user already followed ${followeeusername}`
    })
 }
  const followrecord = await followmodel.create({
    follower:followerusername,
    followee:followeeusername
  })
  res.status(200).json({
    message:`you are no following ${followeeusername}`,
    follow:followrecord
  })
}



async function unfollowcontroller(req,res){
    const followerusername = req.user.user
    const followeeusername = req.params.username

    const isfollowed = await followmodel.findOne({
        follower:followerusername,
        followee:followeeusername
    })
    if(!isfollowed){
        return res.status(401).json({
            message:"you are not followed"
        })
    }
    await followmodel.findByIdAndDelete(isfollowed._id)
    res.status(200).json({
        message:`you are not following now ${followeeusername}`
    })
}

module.exports = {
    followcontroller,
    unfollowcontroller
}
const followmodel = require("../models/follow.model")
const usermodel = require("../models/user.model")

async function followcontroller(req,res){
     const followerusername = req.user.user
     const followeeusername = req.params.username
   console.log(followerusername);
   console.log(req.user);
   
     if(followeeusername === followerusername){
        return res.status(404).json({
            message:"you cannot follow yourself"
        })
     }
     const isfollowerexist = await usermodel.findOne({
        username:followeeusername
     })
     if(!isfollowerexist){
        return res.status(404).json({
            message:"user not exist"
        })
     }
     const useralreadyfollow = await followmodel.findOne({
        follower:followerusername,
        followee:followeeusername
     })
     if(useralreadyfollow){
        return res.status(404).json({
            message:`user already followed ${followeeusername}`,
            follow:useralreadyfollow
        })
     }

     const followrecord = await followmodel.create({
        follower:followerusername,
        followee:followeeusername
     })
     res.status(200).json({
        message:`you are now following ${followeeusername}`,
        follow:followrecord
     })
}

async function unfollowcontroller(req,res){
    const followerusername = req.user.user
    const followeeusername = req.params.username

    const isfollowing = await followmodel.findOne({
        follower:followerusername,
        followee:followeeusername
    })
    if(!isfollowing){
        return res.status(404).json({
            message:"you are not following"
        })
    }
    await followmodel.findByIdAndDelete(isfollowing._id)
    res.status(200).json({
        message:`you have unfollow ${followeeusername}`
    })
}

module.exports = {
    followcontroller,
    unfollowcontroller
}
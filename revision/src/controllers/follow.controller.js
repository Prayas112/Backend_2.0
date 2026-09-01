const followmodel = require("../models/follow.model")
const usermodel = require("../models/user.model")

async function followcontroller (req,res){
    const followerusername = req.user.user
    const followeeusername = req.params.username

    console.log("params:", req.params);
    console.log("userid:", req.params.userid);
    console.log("req.user:", req.user);

    if(followeeusername === followerusername){
        return res.status(401).json({
            message:"you cannot follow yourself"
        })
    }

    const isfolloweeexist = await usermodel.findOne({
        username:followeeusername
    })
    if(!isfolloweeexist){
        return res.status(401).json({
            message:"user not find"
        })
    }

    const isalreadyfollow = await followmodel.findOne({
        follower:followerusername,
        followee:followeeusername
    })

    if(isalreadyfollow){
        return res.status(401).json({
            message:`you are alrady followed ${followeeusername}`
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
        return res.status(401).json({
            message:"you are not follow"
        })
    }
    await followmodel.findByIdAndDelete(isfollowing._id)
    res.status(201).json({
        message:`you are unfollow ${followeeusername}`
    })
}

module.exports = {
    followcontroller,
    unfollowcontroller
}
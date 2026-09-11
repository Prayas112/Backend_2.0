import { useContext } from "react";
import { followuser, unfollowuser } from "../services/Follow.Api";
import { FollowContext } from "../FollowContext";

export const useFollow = ()=>{
    const context = useContext(FollowContext)
    const {following, setfollowing} = context

    const handlefollowuser = async(username)=>{
        await followuser(username)
     setfollowing(prev => [...prev, username]);
    }
    
    const handleunfollowuser = async(username)=>{
        await unfollowuser(username)
           setfollowing(prev =>
        prev.filter(user => user !== username)
    );
    }
    return{
        following,
        handlefollowuser,
        handleunfollowuser
    }
}
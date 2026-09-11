import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function followuser(username){
    const response = await api.post("/api/user/follow/"+ username)
    return response.data
}
export async function unfollowuser(username){
    const response = await api.post("/api/user/unfollow/"+username)
    return response.data
}
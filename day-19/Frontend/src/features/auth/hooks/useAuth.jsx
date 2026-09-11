import { AuthContext } from "../auth.contex";
import { useContext } from "react";
import { login, register, getme, logout } from "../services/auth.api";

export const useAuth = ()=>{
    const context = useContext(AuthContext)

    const{user, setuser, loading, setloading, } = context

    const handlelogin = async(username,password)=>{
        setloading(true)
        const response = await login(username, password)
        setuser(response.user)
        setloading(false)
    }
    const handleregister = async(email, username, password)=>{
        setloading(true)
        const response = await register(email, username, password)
        setuser(response.user)
        setloading(false)
    }
    const handlelogout = async () => {
      await logout();
      setuser(null);
    };
    return{
        user, loading, handleregister, handlelogin, handlelogout
}
}
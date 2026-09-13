import { useContext } from "react";
import {register, login, getme, logout} from "../services/auth.api"
import { AuthContext } from "../auth.context";

export const useAuth = ()=>{
   
    const context = useContext(AuthContext)

    const {user, setuser, loading, setloading} = context

     async function handleregister({email, username, password}){
            setloading(true)
            const data = await register({email, username, password})
            setuser(data.user)
            setloading(false)
    }
     async function handlelogin({ email, username, password }) {
       setloading(true);
       const data = await login({ email, username, password });
       setuser(data.user);
       setloading(false);
     }
     async function handlegetme(){
        setloading(true)
        const data = await getme()
        setuser(data.user)
        setloading(false)
     }
      async function handlelogout() {
        setloading(true);
        const data = await logout();
        setuser(data.user);
        setloading(false)
      }

      return ({
        user, loading, handleregister, handlelogin, handlegetme, handlelogout
      })
}
import { useContext } from "react";
import {register, login, getme, logout} from "../services/auth.api"
import { AuthContext } from "../auth.context";
import { useEffect } from "react";

export const useAuth = ()=>{
   
    const context = useContext(AuthContext)

    const {user, setuser, loading, setloading} = context

     async function handleregister({email, username, password}){
            setloading(true)
            const data = await register({email, username, password})
            setuser(data.user)
            setloading(false)
    }
     async function handlelogin({ email, password }) {
       setloading(true);
       const data = await login({ email, password });
       setuser(data.user);
       setloading(false);
     }
    async function handlegetme() {
 
      try {
        setloading(true);

        const data = await getme();
          
        setuser(data.user);
      } catch (error) {
        setuser(null);
      } finally {
        setloading(false);
      }
    }
      async function handlelogout() {
        setloading(true);
        const data = await logout();
        setuser(null);
        setloading(false)
      }
        


      return ({
        user, loading, handleregister, handlelogin, handlegetme, handlelogout
      })
}
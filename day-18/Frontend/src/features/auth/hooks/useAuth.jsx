import {useContext} from 'react'
import { AuthContex } from '../auth.contex'
import {login, register, getme} from '../services/auth.api'

export const useAuth = ()=>{
    const context = useContext(AuthContex)
    
    const {user, setuser ,loading, setloading} = context

    const handlelogin = async(username, password)=>{
        
        setloading(true)
        const response = await login(username, password)
        setuser( response.user)
        setloading(false)

    }
    const handleregister = async(email, username, password)=>{
        setloading(true)
        const response = await register(email, username, password)
        setuser(response.user)
        setloading(false)
    }
  
     return{
        user, loading , handlelogin, handleregister
     }
}
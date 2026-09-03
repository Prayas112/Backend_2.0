import { createContext, useState } from "react";


export const AuthContex = createContext()

export const AuthProvider = ({children})=>{
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(false);
    
    return(
        <AuthContex.Provider value={{user, setuser, loading, setloading}}>
        {children}
        </AuthContex.Provider>
    )
}
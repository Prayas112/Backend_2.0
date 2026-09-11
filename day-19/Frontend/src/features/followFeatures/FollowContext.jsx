import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const FollowContext = createContext()

export const FollowContextProvider = ({children})=>{

    const [following, setfollowing] = useState([]);
  
    
    return(
        <FollowContext.Provider value={{following, setfollowing}}>
        {children}
        </FollowContext.Provider>
    )
    
}
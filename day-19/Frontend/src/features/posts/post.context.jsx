import { createContext, useState } from "react";


export const PostConetext = createContext()

export const PostConetextProvider = ({children})=>{

    const [loading, setloading] = useState(false);
    const [post, setpost] = useState(null);
    const [feed, setfeed] = useState([]);

    return (
        <PostConetext.Provider value={ {loading, setloading, post, setpost, feed, setfeed}}>
            {children}
        </PostConetext.Provider>
    )
    
    
}
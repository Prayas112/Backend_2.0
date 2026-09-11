import { PostConetext } from "../post.context";
import { useContext, useState } from "react";
import { getfeed, createpost, likepost, unlikepost } from "../services/post.api";


export const usePost = ()=>{
    const context = useContext(PostConetext)
    const { loading, setloading, post, setpost, feed, setfeed } = context
    const [progress, setProgress] = useState(0);

    const handlegetfeed = async()=>{
       setloading(true)
       const data = await getfeed()
       
       setfeed(data.posts.reverse())
       setloading(false)
    }
 const handlecreatepost = async (imgFile, caption) => {
   setloading(true);
   setProgress(0);

   const response = await createpost(imgFile, caption, (percent) => {
          setProgress(Math.min(percent, 90));
   });

   setfeed((prevFeed) => [response, ...prevFeed]);

   setProgress(100);
   setloading(false);
 };
   const handlelikepost = async (postid) => {
     await likepost(postid);

     setfeed((prevFeed) =>
       prevFeed.map((post) =>
         post._id === postid ? { ...post, isLiked: true,  } : post,
       ),
     );
   };

   const handleunlikepost = async (postid) => {
     await unlikepost(postid);

     setfeed((prevFeed) =>
       prevFeed.map((post) =>
         post._id === postid
           ? {
               ...post,
               isLiked: false,
              
             }
           : post,
       ),
     );
   };
    return{
        loading, feed, progress, post ,handlegetfeed, handlecreatepost,handlelikepost, handleunlikepost
    }
}

import { Appbar } from "../components/Appbar"

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { BlogUpdate } from "../components/BlogUpdate";

export const EditPost =()=>{
    const {id} =useParams();
    
    const {loading,blog}=useBlog({
        id: id||""
    });
   
    if(loading||!blog)
    {
        return <div>
            <Appbar></Appbar>
            loading...
        </div>
    }
    return <div>
    <Appbar></Appbar>
    <BlogUpdate blog={blog}/>
    </div>
}
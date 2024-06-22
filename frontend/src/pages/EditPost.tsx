

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { BlogUpdate } from "../components/BlogUpdate";
import { Loader } from "../components/Loader";

export const EditPost =()=>{
    const {id} =useParams();
    
    const {loading,blog}=useBlog({
        id: id||""
    });
   
    if(loading||!blog)
    {
        return <div>
            
            <Loader message="Loading Editor"/>
        </div>
    }
    return <div>
    
    <BlogUpdate blog={blog}/>
    </div>
}


import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { BlogUpdate } from "../components/BlogUpdate";
import { Loader } from "../components/Loader";
import { Appbar } from "../components/Appbar";

export const EditPost =()=>{
    const {id} =useParams();
    
    const {loading,blog}=useBlog({
        id: id||""
    });
   
    if(loading||!blog)
    {
        return <div>
            <Appbar></Appbar>
            <Loader message="Loading Editor"/>
        </div>
    }
    return <div>
    <Appbar></Appbar>
    <BlogUpdate blog={blog}/>
    </div>
}
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { CompleteBlog } from "../components/CompleteBlog";
import { Appbar } from "../components/Appbar";
import { Loader } from "../components/Loader";


export const Blog = () =>{
    const {id} =useParams();
    
    const {loading,blog}=useBlog({
        id: id||""
    });
   
    if(loading||!blog)
    {
        return <div>
            <Appbar></Appbar>
            <Loader message="Loading Blog"/>
        </div>
    }
    return <div>
    <CompleteBlog blog={blog}/>
    </div>
}

import { useBlogs } from "../hooks";
import BlogPaginatedItems from "../components/blogPaginatedItems";
import { Appbar } from "../components/Appbar";






 export const Blogs =()=>{
    const { loading, blogs } = useBlogs();
   
    return <div>
       
        <Appbar></Appbar>
        <BlogPaginatedItems loading={loading} blogs={blogs}></BlogPaginatedItems>
       
    </div>
}
    
    

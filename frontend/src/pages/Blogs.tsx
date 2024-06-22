
import { useBlogs } from "../hooks";
import BlogPaginatedItems from "../components/blogPaginatedItems";





 export const Blogs =()=>{
    const { loading, blogs } = useBlogs();
   
    return <div>
      
        <BlogPaginatedItems loading={loading} blogs={blogs}></BlogPaginatedItems>
    </div>
}
    
    

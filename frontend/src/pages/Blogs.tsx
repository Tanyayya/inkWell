
import { useBlogs } from "../hooks";
import BlogPaginatedItems from "../components/blogPaginatedItems";





 export const Blogs =()=>{
    const { loading, blogs } = useBlogs();
    console.log(blogs)
    return <div>
        
        <BlogPaginatedItems loading={loading} blogs={blogs}></BlogPaginatedItems>
    </div>
}
    
    



import { useSavedBlogs } from "../hooks";


import BlogPaginatedItems from "../components/blogPaginatedItems";

export const Drafts =()=>{
    
    

    const { loading, blogs } = useSavedBlogs();
    console.log(blogs)
   
        return (
          <BlogPaginatedItems loading={loading} blogs={blogs}></BlogPaginatedItems>
        );
      
    }
       
        
    
     
   

        
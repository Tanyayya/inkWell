

import { useSavedBlogs } from "../hooks";


import BlogPaginatedItems from "../components/blogPaginatedItems";
import { Appbar } from "../components/Appbar";

export const Drafts =()=>{
    
    

    const { loading, blogs } = useSavedBlogs();
    
   
        return (<div>
           <Appbar></Appbar>
          <BlogPaginatedItems loading={loading} blogs={blogs}></BlogPaginatedItems>
        </div>
         
        );
      
    }
       
        
    
     
   

        
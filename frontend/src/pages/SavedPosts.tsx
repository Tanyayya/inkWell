import { useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BlogCard } from "../components/BlogCard";

export type Saved =string;
interface Post {
    id: string;
    title: string;
    content: string;
    publishedDate:string;
    author: {

      name: string | null;
    };
    anonymous:boolean
}

 export const SavedPosts = ({ saved }: { saved: Saved[] }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    
   
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/vi/blog/saved`,
                {
                    saved
                },{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
               
                setPosts(response.data.response)            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
                    
    },[saved])

    return (
        <div>
           
           {posts.map((blog) => (
          <BlogCard
          key={blog.id}// Add a key prop for each item in the list
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.publishedDate}
            anonymous={blog.anonymous}
            //anonymous={blog.anonymous}
          />
        ))}
            
        </div>
    );
};

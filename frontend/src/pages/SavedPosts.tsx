import { useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export type Saved =string;
interface Post {
    id: string;
    content: string;
    title: string;
    publishedDate: string;
    anonymous: boolean;
    author: {
        id: string;
        name: string;
    };
}

 export const SavedPosts = ({ saved }: { saved: Saved[] }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    
    console.log(saved)
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/vi/blog/saved`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
                    
    },[saved])

    return (
        <div>
           
           {posts.map(post => (
                <div className="text-bold" key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <small>{post.publishedDate}</small>
                    <p>Author: {post.author.name}</p>
                </div>
            ))}
            
        </div>
    );
};

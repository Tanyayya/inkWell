import {useEffect, useState} from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export interface Blog {
    "content":string,
    "title":string,
    "id":string,
    "author":{
        "name":string
    }
}
export const useBlog =({id}:{id:string}) =>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/vi/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                const responseData = response.data.response[0]; // Assuming you're always expecting one blog entry
                const blogData: Blog = {
                content: responseData.content,
                title: responseData.title,
                id: responseData.id,
                author: responseData.author ? { name: responseData.author.name || "Anonymous" } : { name: "" }
            };
                setBlog(blogData);
                setLoading(false);
            })
    }, [id])
     console.log(blog)
    return {

        loading,
        blog
    }

}
export const useBlogs =() =>{
    const [blogs, setBlogs] = useState<Blog []>([]);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/vi/blog/bulk`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
        .then(res=>{
            setBlogs(res.data.blogs);
            setLoading(false)
        })
    },[])
    return {
        loading,
        blogs
    }
}
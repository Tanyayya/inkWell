import {useEffect, useState} from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export interface Blog {
    "content":string,
    "title":string,
    "id":string,
    "publishedDate":string,
    "author":{
        "name":string,
        "id":string
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
                publishedDate:responseData.publishedDate,
                author : responseData.author
                ? { id: responseData.author.id, name: responseData.author.name || "Anonymous" }
                : { id: "", name: "Anonymous" }
            };
                setBlog(blogData);
                setLoading(false);
            })
    }, [id])
     
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
        blogs,
       

    }
}
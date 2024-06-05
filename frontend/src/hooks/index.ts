import {useEffect, useState} from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export interface Blog {
    "content":string,
    "title":string,
    "id":string,
    "publishedDate":string,
    "anonymous":boolean,
    "author":{
        "name":string,
        "id":string,
    }
}
export interface Blogs {
    "content":string,
    "title":string,
    "id":string,
    "publishedDate":string,
    "anonymous":boolean,
    "author":{
        "name":string,
        "id":string,
        "about":string
    }
}
export const useBlog =({id}:{id:string}) =>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blogs>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/vi/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                const responseData = response.data.response[0]; // Assuming you're always expecting one blog entry
                const blogData: Blogs = {
                content: responseData.content,
                title: responseData.title,
                id: responseData.id,
                publishedDate:responseData.publishedDate,
                anonymous:responseData.anonymous,
                author : { id: responseData.author.id, name: responseData.author.name|| "Anonymous" ,about:responseData.author.about ||""}
               
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

import { About } from "../components/About";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard"
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Blog } from "../hooks";
import BlogPaginatedItems from "./blogPaginatedItems";

export interface User{
   id:string,
    name:string,
    about:string,
    posts:[]
}

export const Author=({ user }: { user: User })=>{
   
    const [about, setAbout] = useState(false);
    const [home,setHome]=useState(true);
    const [authorBlogs, setBlogs] = useState<Blog []>([]);
    
    
    return <div>
       <Appbar></Appbar>
       <div className="max-w-screen-xl flex p-6 mx-auto  flex-wrap">
       <Avatar size="big" name={user.name}></Avatar>
        <div className="p-2 text-xl font-semibold ">{user.name}</div>
       </div>
        
        <nav className="bg-gray-50 p-2">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <a onClick={async ()=>{setAbout(true); setHome(false);
                            const response = await axios.get(`${BACKEND_URL}/api/vi/user/blogs/${user.id}`,
                            {
                                headers:{
                                    Authorization:localStorage.getItem("token")
                                }
                            });
                           
                            setBlogs(response.data.blogs)  
                           
                    }} className="text-gray-900 cursor-pointer hover:underline" aria-current="page">Home</a>
                </li>
                <li>
                    <a onClick={()=>{setAbout(false); setHome(true);}} className="text-gray-900 cursor-pointer hover:underline">About</a>
                </li>
                
            </ul>
        </div>
    </div>
</nav>
<div className={!about?'block':'hidden'}>
<About aboutInfo={user} ></About>

</div>
<div className={!home?'block':'hidden'}>
    <div className="flex justify-center flex-col items-center   p-4 border border-slate-200">
    <div className="flex justify-center text-gray-900 text-center bg-slate-200   text-l font-medium p-4 border border-slate-200 pb-4  w-screen max-w-screen-md"></div>
    <BlogPaginatedItems loading={false} blogs={authorBlogs}></BlogPaginatedItems>
    
    </div>

</div>
    
    </div>
}
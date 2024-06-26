import { Link } from "react-router-dom"
import dateFormat from "dateformat"
import { SavedIcon } from "./SavedIcon"
import { useUserInfo } from "../hooks/userInfo"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
export interface BlogCardProps {
    authorName:string,
    title:string,
    content:string,
    publishedDate: string,
    id:string,
    anonymous:boolean,
    authorId:string
}
export interface User{
    saved:string[]
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
    authorId,
    anonymous
}:BlogCardProps) =>{
    const name=(!anonymous)?authorName:"Anonymous"
    const words=content.split(" ");
    const { user } = useUserInfo() as { user: User | null };
    const [save] = useState<boolean>(() => {
        return user ? user.saved.includes(id) : false;
      });
      const navigate = useNavigate();
       function author(e:React.MouseEvent) {
        e.stopPropagation();
                    navigate(`/user/${authorId}`);
    }

    
    return <div  className="flex justify-center  ">
    <div className="p-4 border-b bg-slate-50 border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="">
            <Avatar 
             onClick={author}
            name={name}></Avatar>
            </div>
            
            <div  onClick={author} className="flex justify-center flex-col font-extralight text-sm pl-2"> {name} </div>
            
            <div className="flex justify-center flex-col pl-2 "> <Circle></Circle></div>
            <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
            {dateFormat(publishedDate, "mmmm dS, yyyy")}
            </div>
        </div>
        <Link to={`/blog/${id}`}>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
         <div className="text-md font-thin" dangerouslySetInnerHTML={{__html:content.slice(0,100)+"..."}}>
        </div>
        
        <div className="flex justify-between text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(words.length/100)} min read`}
            <SavedIcon user={user} saved={save} id={id}></SavedIcon>
        </div>
        
        </Link>
       
    </div>
    </div>
}


export function Avatar({name,size="small",id,onClick}:{name:string,size?:"small"|"big",id?:string,onClick?:(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>void}) {
    return <div id={id} onClick={onClick} className={`relative inline-flex items-center justify-center overflow-hidden cursor-pointer ${size==="small"?"w-6 h-6":"w-10 h-10"} bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`font-medium ${size==="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
    
}


export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
import { Link } from "react-router-dom"
import dateFormat from "dateformat"

export interface BlogCardProps {
    authorName:string,
    title:string,
    content:string,
    publishedDate: string,
    id:string
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}:BlogCardProps) =>{
    return <Link to={`/blog/${id}`} className="flex justify-center">
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="">
            <Avatar name={authorName}></Avatar>
            </div>
            
            <div className="flex justify-center flex-col font-extralight text-sm pl-2"> {authorName} </div>
            <div className="flex justify-center flex-col pl-2 "> <Circle></Circle></div>
            <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
            {dateFormat(publishedDate, "mmmm dS, yyyy")}
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+"..."}
        </div>
        <div className=" text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} min read`}
        </div>
        <div>

        </div>
    </div>
    </Link>
}


export function Avatar({name,size="small",id,onClick}:{name:string,size?:"small"|"big",id?:string,onClick?:()=>void}) {
    return <div id={id} onClick={onClick} className={`relative inline-flex items-center justify-center overflow-hidden cursor-pointer ${size==="small"?"w-6 h-6":"w-10 h-10"} bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`font-medium ${size==="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
    
}


export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
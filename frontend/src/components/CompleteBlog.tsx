import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar,Circle } from "./BlogCard"
import dateFormat from 'dateformat';


export const CompleteBlog  =({blog}:{blog:Blog}) => {
    
    return <div>
        <Appbar />
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 mx-w-screen-xl  pt-12">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                    </div>
                    <div className=" flex  text-slate-500 pt-4">
                    <div className="flex justify-center flex-col "> {`${Math.ceil(blog.content.length/100)} min read`} </div>
            <div className="flex justify-center flex-col pl-2 "> <Circle></Circle></div>
            <div className="flex justify-center flex-col pl-2 ">
            {dateFormat(blog.publishedDate, "mmmm dS, yyyy")}
            </div>
                    
                    
                    
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
            </div>
            <div className="col-span-4">
                <div className="text-slate-500 font-bold">Author</div>
                <div className="flex">
                    <div className="pr-4 flex-col justify-center"> 
                    <Avatar size="big"name={blog.author.name}></Avatar>
                    </div>
                    <div>
                    <div className="text-xl font-bold">
                        {blog.author.name}
                        </div>
                        
                        <div className="pt-2 text-slate-500">
                            Random catch phrase about the author to catch user's attention
                         </div>
                    </div>
                      
                </div>
                
            </div>
            
        </div>
        </div>
    </div>
}
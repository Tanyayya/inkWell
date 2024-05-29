import { ChangeEvent, useState } from "react"

import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { decode } from "hono/jwt";

import { Blog } from "../hooks"

export const BlogUpdate =({blog}:{blog:Blog})=>{
    
    const [title,setTitle]=useState(blog.title);
    const [description,setDescription]=useState(blog.content);
    const [published,setPublished]=useState(false);
    const [anonymous,setAnonymous]=useState(false);

    const navigate=useNavigate();
    return <div>
      
        <div className="flex justify-center w-full pt-8">
        
            <div className="max-w-screen-lg w-full" >
            <div className="flex ">
            <div className="flex items-center mb-4 px-8">
                <input  onClick={()=>{
                    setPublished(!published)
                   
                }} id="publish-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
                <label  className="ms-2 text-sm font-medium text-gray-900 ">Publish</label>
            </div>
            <div className="flex items-center mb-4">
                <input onClick={()=>{
                    setAnonymous(!anonymous)
                   
                }} id="anonymous-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
                <label  className="ms-2 text-sm font-medium text-gray-900 ">Post Anonymously</label>
            </div>
            </div>
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="text" id="helper-text" value={blog.title} aria-describedby="helper-text-explanation" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title"/>
                <TextEditor content={blog.content} onChange={(e)=>{
                    setDescription(e.target.value)
                }}/>
                <button onClick={async ()=>
                {
                    const {payload} = decode(localStorage.getItem("token")||"");
                    let authorId=payload.id;
                    if(anonymous)
                        {
                            authorId=null;
                        }
                    await axios.put(`${BACKEND_URL}/api/vi/blog/${blog.id}`,
                    {
                        title,
                        content:description,
                        published,
                        authorId
                    },{
                        headers:{
                            Authorization:localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${blog.id}`)
                    
                }}
           type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
               Save Post 
           </button>
            </div>
        
    </div>
    
    </div>
    
}

interface TextEditorProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    content: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange, content }) =>  {
  return <div>

<form className="pt-4">
   <div className=" w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
       <div className="  py-2 bg-white rounded-t-lg ">
           <label  className="sr-only">Your post</label>
           <textarea value={content} onChange={onChange} id="comment" rows={4} className="focus:outline-none w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 " placeholder="Write your post..." required ></textarea>
       </div>
       <div className="flex items-center justify-between px-3 py-2 border-t ">
           
           <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
               <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                   <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                    </svg>
                   <span className="sr-only">Attach file</span>
               </button>
               <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                   <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                    </svg>
                   <span className="sr-only">Set location</span>
               </button>
               <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                   <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                   <span className="sr-only">Upload image</span>
               </button>
           </div>
       </div>
   </div>
</form>
<p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

  </div>
}
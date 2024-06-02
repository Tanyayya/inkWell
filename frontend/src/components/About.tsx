import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios  from "axios"


export interface AboutInfo{
    about:string
}
export const About=({aboutInfo}:{aboutInfo:AboutInfo})=>{
    
    const [edit,setEdit]=useState(false);
    const [about,setabout]=useState(aboutInfo.about)
   
    return <div className="flex justify-center p-8">
        <div className={`${edit?'hidden':'block'} flex  flex-col justify-center items-center`}>
        <div className="text-center bg-slate-100  p-4 border border-slate-200 pb-4 w-screen max-w-screen-sm ">
        {about}
        </div>
        <button type="button" className="p-4 m-4 text-gray-900  bg-slate-200 hover:text-white border border-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>{setEdit(true)}}> Edit personal Info</button>
        </div>
       
        <div className={`${!edit?'hidden':'block'} flex justify-center flex-col p-5 items-center`} >
            <div className="text-center bg-slate-100  p-4 border border-slate-200 pb-4 w-screen max-w-screen-sm ">
            <input onChange={(e)=>{
                    setabout(e.target.value)
                }} type="text" id="helper-text" defaultValue={aboutInfo.about} aria-describedby="helper-text-explanation" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "/>
            </div>
        
        <button type="button" className="p-4 m-4 text-gray-900  bg-slate-200 hover:text-white border border-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={async ()=>
                {
                   
                    
                    await axios.put(`${BACKEND_URL}/api/vi/user`,
                    {
                        about,

                       
                    },{
                        headers:{
                            Authorization:localStorage.getItem("token")
                        }
                    });
                   
                   setEdit(false)
                    
                }}> Save Info</button>
            
        </div>
       
        
    </div>
}
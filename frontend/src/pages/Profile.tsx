
import { About } from "../components/About";
import { Avatar } from "../components/BlogCard"
import { useUserInfo } from "../hooks/userInfo"
import { useState } from "react";
import { SavedPosts } from "./SavedPosts";
import { Loader } from "../components/Loader";


export const Profile=()=>{
    const {user}=useUserInfo();
    const [about, setAbout] = useState(false);
    const [home,setHome]=useState(true);
    if (!user) {
        return <div>
           
            <Loader message="Loading your profile"/>
        </div>
    }
    return <div>
     
       <div className="max-w-screen-xl flex p-6 mx-auto  flex-wrap">
       <Avatar size="big" name={user.name}></Avatar>
        <div className="p-2 text-xl font-semibold ">{user.name}</div>
       </div>
        
        <nav className="bg-gray-50 p-2">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <a onClick={()=>{setAbout(true); setHome(false);}} className="text-gray-900 cursor-pointer hover:underline" aria-current="page">Home</a>
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
    <div className="flex justify-center text-gray-900 text-center bg-slate-200   text-l font-medium p-4 border border-slate-200 pb-4  w-screen max-w-screen-md">Saved Posts</div>
<SavedPosts saved={user.saved}></SavedPosts>
    </div>

</div>
    
    </div>
}
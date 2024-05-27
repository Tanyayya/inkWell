import { Link } from "react-router-dom"
import {Avatar} from "./BlogCard"
import { useState } from "react";
import { useUserInfo } from "../hooks/userInfo";



export interface User {
    "name":string,
    
}

 export const Appbar=()=>
{
    const {user,loading,error}=useUserInfo()
    console.log(user)
   
    return <div className="max-w-screen-xl border-b flex flex-wrap items-center justify-between mx-auto px-10 py-4">
        <Link  className="flex " to={"/blogs"}>
        <img src="/logo.avif" className="h-12 mr-2" alt="Flowbite Logo" />
        <div className="flex justify-center flex-row cursor-pointer self-center text-2xl font-semibold ">
            InkWell
        </div>
        </Link>
        
        <div>
            <Link to={"/publish"}>
            <button type="button" className="mr-6 focus:outline-none border border-slate-300 text-slate-600 bg-slate-200 hover:bg-slate-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">New Post</button>
            </Link>
            
            {loading ? (
                    <Dropdown id="dropdownDefaultButton" size={"big"} name={""} />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    user && <Dropdown id="dropdownDefaultButton" size={"big"} name={user.name} />
                )}
            
           
            </div>
</div>
}

interface DropdownProps {
    id: string;
    name: string;
    size?: "small" | "big";
}


function Dropdown({ id, size,name }:DropdownProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);

    };
    
    return (
        <div className="relative inline-block">
            <Avatar id={id} size={size} name={name} onClick={toggleDropdown} />
            <div className={`absolute right-0 mt-2 z-10 ${dropdownVisible ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={id}>
                    <Link to={"/user"}>
                    <li>
                        
                        <a  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                    </li>
                    </Link>
                   
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Signout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
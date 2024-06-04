import { Link } from "react-router-dom"
import {Avatar} from "./BlogCard"
import { useState } from "react";




 export const Appbar=()=>
{
   
    const name=localStorage.getItem("name")||"";
   
    return <div className="max-w-screen-xl border-b flex flex-wrap items-center justify-between mx-auto px-10 py-4">
        <Link  className="flex " to={"/blogs"}>
        <img src="/logo.avif" className="h-12 mr-2" alt="Flowbite Logo" />
        <div className="flex justify-center flex-row cursor-pointer self-center text-2xl font-semibold ">
            InkWell
        </div>
        </Link>
        
        <div>
            <Link to={"/publish"}>
            <button type="button" className="mr-6 text-gray-900  bg-slate-200 hover:text-white border border-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">New Post</button>
            </Link>
            
           
                    <Dropdown id="dropdownDefaultButton" size={"big"} name={name} />
                
            
           
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
                    <Link to={"/me"}>
                    <li>
                        
                        <a  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                    </li>
                    </Link>
                   
                    <li>
                        <a href="/signin" onClick={()=>
                            localStorage.clear()
                            
                            } className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Signout</a>
                    </li>
                </ul >
            </div>
        </div>
    );
}
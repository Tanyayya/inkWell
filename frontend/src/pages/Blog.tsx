import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { CompleteBlog } from "../components/CompleteBlog";
import { Loader } from "../components/Loader";
import { Appbar } from "../components/Appbar";
import { useUserInfo } from "../hooks/userInfo";
import { createContext } from "react";

interface User {
    id: string;
    following: string[];
   
    // Add other user properties as needed
  }
  
  export const UserContext = createContext<User | null>(null);
export const Blog = () =>{
    const {id} =useParams();
    const {user}=useUserInfo();
    const {loading,blog}=useBlog({
        id: id||""
    });
   
    if(loading||!blog)
    {
        return <div>
            <Appbar></Appbar>
            <Loader message="Loading Blog"/>
        </div>
    }
    return <div>
        <UserContext.Provider value={user}>
         <Appbar></Appbar>
    <CompleteBlog  blog={blog}/>
    </UserContext.Provider>
    </div>
}
import {  useRealTimeBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { CompleteCollaborateBlog } from "../components/CompleteCollaborateBlog";
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
export const CollaborateBlog = () =>{
    const {id} =useParams();
    const {user}=useUserInfo();
    const {loading,rBlog}=useRealTimeBlog({
        id: id||""
    });
   
    if(loading||!rBlog)
    {
        return <div>
            <Appbar></Appbar>
            <Loader message="Loading Blog"/>
        </div>
    }
    return <div>
        <UserContext.Provider value={user}>
         <Appbar></Appbar>
    <CompleteCollaborateBlog  rblog={rBlog}/>
    </UserContext.Provider>
    </div>
}
import { useParams } from "react-router-dom"
import { useAuthorInfo } from "../hooks/userInfo";

import { Loader} from "../components/Loader";
import { Author } from "../components/Author";
export const AuthorPage=() =>{
    const {id}=useParams();
    const {loading,user,error}=useAuthorInfo({
        id: id||""
    });
    if(loading||!user)
        {
            return <div>
               
                <Loader message="Loading Author"/>
            </div>
        }
    return <div>
   <Author user={user}></Author>
    </div>
}
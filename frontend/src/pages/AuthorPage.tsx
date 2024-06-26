import { useParams } from "react-router-dom"
import { useAuthorInfo } from "../hooks/userInfo";

import { Loader} from "../components/Loader";
import { Author } from "../components/Author";
import { Appbar } from "../components/Appbar";
export const AuthorPage=() =>{
    const {id}=useParams();
    const {loading,user}=useAuthorInfo({
        id: id||""
    });
    if(loading||!user)
        {
            return <div>
                <Appbar></Appbar>
                <Loader message="Loading Author"/>
            </div>
        }
    return <div>
    <Appbar></Appbar>
   <Author user={user}></Author>
    </div>
}
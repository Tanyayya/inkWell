import axios from "axios"
import { BACKEND_URL } from "../config"
import { Link} from "react-router-dom"
import { useUserInfo } from "../hooks/userInfo"
import { useState } from "react"
import { useEffect } from "react"

export interface User{
    saved:string[]
}
export const SavedIcon=({id}:{id:string})=>{
    const { user } = useUserInfo() as { user: User | null };
    const [save, setSave] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            const isSaved = user.saved.includes(id);
            setSave(isSaved);
        }
    }, [user, id]);
    return <div>
        <Link to="/blogs">{(save===false)?<img onClick={async()=>{
                await axios.post(`${BACKEND_URL}/api/vi/blog/save`,
                {
                    id,

                   
                },{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
                setSave(true); 
            }}src="/save.png" className="h-5 mr-2" alt="Flowbite Logo" />:
            <img onClick={async()=>{
                await axios.post(`${BACKEND_URL}/api/vi/blog/unsave`,
                {
                    id,

                   
                },{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
                setSave(false); 
            }}src="/unsave.png" className="h-5 mr-2" alt="Flowbite Logo" />}
</Link>
    </div>
}
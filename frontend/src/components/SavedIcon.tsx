import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useEffect } from "react"

export interface User{
    saved:string[]
}
export const SavedIcon=({ id, user, saved }: { id: string, user: User | null, saved: boolean })=>{
   
    const [save, setSave] = useState<boolean>(saved)

    useEffect(() => {
        if (user) {
            const isSaved = user.saved.includes(id);
            setSave(isSaved);
        }
    }, [user, id]);
    return <div>
        {(save===false)?<img onClick={async(e)=>{
            e.preventDefault();
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
            <img onClick={async(e)=>{
                e.preventDefault();
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

    </div>
}
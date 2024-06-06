import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";







// export const Publish =()=>{
//     const [title,setTitle]=useState("");
//     const [description,setDescription]=useState("");
//     const navigate=useNavigate();
   


//     return <div>
//         <Appbar></Appbar>
        
//         <div className="flex justify-center w-full pt-8  ">
        
//             <div className="max-w-screen-lg w-full bg-slate-200 "  >
//                 <input onChange={(e)=>{
//                     setTitle(e.target.value)
//                 }} type="text" id="helper-text" aria-describedby="helper-text-explanation" className=" bg-slate-200  focus:outline-none  text-gray-900 text-md   block w-full p-2.5 " placeholder="Title"/>
//                 <TextEditor onChange={(e)=>{
//                     setDescription(e.target.value)
//                 }}/>
//                 <div className="bg-white py-4" >
//                 <button onClick={async ()=>
//                 {
//                     const response=await axios.post(`${BACKEND_URL}/api/vi/blog`,
//                     {
//                         title,
//                         content:description
//                     },{
//                         headers:{
//                             Authorization:localStorage.getItem("token")
//                         }
//                     });
//                     navigate(`/blog/${response.data.id}`)
                    
//                 }}
//            type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200  hover:bg-green-800">
//                Publish Post 
//            </button>
//            <p className="ms-auto text-xs py-4 text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
//                 </div>
                
//             </div>
        
//     </div>
    
//     </div>
    
// }






export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [anonymous, setAnonymous] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
        <Appbar></Appbar>
    <div className="min-w-screen flex flex-col">
     
      <div className="flex justify-center items-center flex-grow py-4 ">
        <div className="flex flex-col justify-center w-full max-w-screen-md bg-white p-2 rounded-lg shadow-lg">
          <div className="flex  mb-4">
            <div className="flex items-center p-2">
              <input
                onClick={() => {
                  setPublished(!published);
                }}
                id="publish-checkbox"
                type="checkbox"
                checked={published}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Publish
              </label>
            </div>
            <div className="flex items-center">
              <input
                onClick={() => {
                  setAnonymous(!anonymous);
                }}
                id="anonymous-checkbox"
                type="checkbox"
                checked={anonymous}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Post Anonymously
              </label>
            </div>
          </div>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            id="helper-text"
            
            aria-describedby="helper-text-explanation"
            className="bg-slate-200 focus:outline-none text-gray-900 text-md block w-full p-2.5 mb-4"
            placeholder="Title"
          />
          <TextEditor
            
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className="bg-white py-4">
            <button
              onClick={async () => {
                const response=await axios.post(`${BACKEND_URL}/api/vi/blog`,
                    {
                        title,
                        content:description
                    },{
                        headers:{
                            Authorization:localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
              }}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800"
            >
              Save Post
            </button>
            <p className="ms-auto text-xs text-gray-500 dark:text-gray-400 py-2">
              Remember, contributions to this topic should follow our{" "}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Community Guidelines
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    
    return <div>
  
  <form className="pt-4">
     <div className=" w-full    bg-white">
         <div className=" p-3  bg-white  ">
             <label  className="sr-only">Your post</label>
             <textarea onChange={onChange} id="comment" rows={4} className="focus:outline-none w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 " placeholder="Write your post..." required ></textarea>
         </div>
         <div className="flex items-center justify-between px-3 py-2 border-t ">
             
             <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                 <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                     <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                          <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                      </svg>
                     <span className="sr-only">Attach file</span>
                 </button>
                 <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                     <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                          <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                      </svg>
                     <span className="sr-only">Set location</span>
                 </button>
                 <button  type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                     <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                      </svg>
                     <span className="sr-only">Upload image</span>
                 </button>
             </div>
         </div>
     </div>
  </form>
  
  
    </div>
  }
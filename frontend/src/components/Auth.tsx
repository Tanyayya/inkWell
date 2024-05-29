import { SignupInput } from "@tanyashukla/blog-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"



export interface User {
    "name":string,
    
}
export const Auth =({type}:{type:"signup"|"signin"}) =>{
    const navigate=useNavigate();
    
    
    const [postInputs,setPostinputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
   
   

    
    const sendRequest = async() =>{

         try {
            const response = await axios.post(`${BACKEND_URL}/api/vi/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const { token, name } = response.data; 
            console.log(token)
            localStorage.setItem("token", token);
            localStorage.setItem("name",name)

            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
            // alert the user here that the request failed
        }
        }
    
    
    return <div className=" h-screen flex justify-center flex-col">
       <div className="flex justify-center">
        <div>
         <div className="px-10">
            <div className="text-3xl font-extrabold">
                Create an account
            </div>
            <div className="text-slate-400">
                {type==="signup"?"Already have an account?":"Don't have an account?"}
                <Link to={type==="signup"?"/signin":"/signup"} className="pl-2 underline">{type==="signup"?"Sign in":"sign up"}</Link>
            </div>
         </div>
         <div className="pt-8">
         
         {type==="signup"?<LabelledInput label="Name" placeholder="John..." onChange={(e)=>{
            setPostinputs({
                ...postInputs,
                name:e.target.value
         })
         }} ></LabelledInput>:null}
         <LabelledInput label="Email" placeholder="John@gmail.com" onChange={(e)=>{
            setPostinputs({
                ...postInputs,
                email:e.target.value
         })
         }} ></LabelledInput>
         <LabelledInput label="Name" type={"password"} placeholder="123456" onChange={(e)=>{
            setPostinputs({
                ...postInputs,
                password:e.target.value
         })
         }} ></LabelledInput>
         <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up":"sign in"}</button>
         </div>
         </div>
       </div>
        
    </div>
}


interface LabelledInputtype{
    label:string,
    placeholder:string,
    onChange:(e: ChangeEvent<HTMLInputElement>) =>void;
    type?:string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputtype){
    return <div className="pt-4">
        <label  className="block mb-2 font-semibold text-sm  text-gray-900 dark:text-black">{label}</label>
            <input onChange={onChange} type={type||"text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
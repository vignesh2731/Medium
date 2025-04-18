import { ChangeEvent,  useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import {SignupInput} from '@sreevignesh27/common'
import axios from 'axios'
import { BACKEND_URL } from "../config";

export const Auth=({type}:{type: "Signup" | "Signin"})=>{
    const [postInputs,setPostInputs] =useState<SignupInput>({
        email:"",
        password:""
    })
    const navigate=useNavigate();
    async function sendRequest()
    {
        try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/user/${type==='Signin'?'signin':'signup'}`,postInputs);
            const jwt=response.data.token;
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        }catch(e){

        }
    }
    return( <div className="h-screen flex flex-col justify-center"> 
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl  font-extrabold">
                        {type==="Signup"?"Create an Account" :"Login your account"}
                    </div>
                    <div className="text-slate-400">
                        {type==="Signup"? "Already have an account?" : "Dont have an account?"}
                        <Link to={type==="Signin"?"/signup" :"/signin"} className="pl-2 underline">{type==="Signin"?"Signup":"Signin"}</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center mt-10">
        <div>
            <LabelledInput label="Username" placeholder="Vignesh Naikoti" onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    email:e.target.value
                    }))
                }}/>
            <LabelledInput label="Password" placeholder="123456789" type="password" onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    password:e.target.value
                    }))
                }}/>
            <button onClick={sendRequest} type="button" className=" mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type}</button>
            </div>
        </div>
    </div>)
}

interface LabelledInputTypes{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputTypes){
    return <div className="w-120">
        <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900  w-full text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}
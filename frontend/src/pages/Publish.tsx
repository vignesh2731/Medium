import { useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
interface BlogInputs{
    title:string;
    content:string
}
export const Publish=()=>{
    const [blog,setBlog]=useState<BlogInputs>({
        title:"",
        content:""
    })
    const navigate=useNavigate();
    return <div>
        <Appbar/>
        <div className="mx-3 pt-20 max-w-screen flex flex-col justify-center items-center">
                <div>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <textarea id="message"  className="block p-2.5 w-160 h-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Heading of your story" onChange={(e)=>{
                      setBlog(c=>({...c,
                        title:e.target.value
                      }))
                    }}></textarea>
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Your message</label>
                    <textarea id="message"  className="block p-2.5 w-full h-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>{
                        setBlog(c=>({...c,content:e.target.value}))
                    }}></textarea>
                    <div className="flex justify-center pt-5">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async()=>{
                            const res=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                                title:blog.title,
                                content:blog.content
                            },{
                                headers:{
                                    Authorization:localStorage.getItem("token")
                                }
                            })
                            navigate(`/blog?id=${res.data.id}`)
                        }}>Publish</button>
                    </div>
                </div>
        </div>
    </div>
}
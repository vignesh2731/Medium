import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
export interface Blog{
    id:string;
    content:string;
    title:string;
    author:{
        email:string
    }

}
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(res=>{
            setBlogs(res.data.blogs);
            setLoading(false);
        })
    },[])
    return {
        loading,
        blogs
    }
}
export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<Blog>();
    useEffect(()=>{
        if (!id || id === "null") {
            console.warn("Invalid ID for fetching blog:", id);
            setLoading(false);
            return;
          }
        axios.get(`${BACKEND_URL}/api/v1/blog?id=${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(res=>{
            setBlog(res.data.blog);
            setLoading(false);
            
        })
    },[id])
    return {
        loading,
        blog
    }
}
import { Link } from "react-router-dom";

interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id:string
}
export const BlogCard=({authorName,title,content,publishedDate,id}:BlogCardProps)=>{
    return(<Link to={`/blog?id=${id}`}>
    <div className="w-screen max-w-screen-md flex  p-5  justify-center border-b border-slate-200 cursor-pointer"> 
        <div className="flex">
            <div className="lg:-ml-90">
                <div className="flex">
                    <Avatar name="Viggie"/>
                    <div className="pl-7">{authorName}</div>
                    <div> &nbsp;&nbsp;&bull; </div>
                    <div className="text-slate-400 font-thin pl-3">{publishedDate}</div>
                </div>
                <div className="font-semibold text-xl mt-2">
                    {title}
                </div>
                <div className="font-thin mt-2">
                    {content.substring(0,100)+"...."}
                </div>
                <div className="text-sm mt-4 text-slate-400">
                    {Math.ceil(content.length/100)} min read
                </div>
            </div>
            </div>
    </div></Link>)
}

export function Avatar({name}:{name:string})
{         
    return(
    <div className="relative inline-flex items-center justify-center w-7 h-7  bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">{name[0]}</span>
    </div>)
}
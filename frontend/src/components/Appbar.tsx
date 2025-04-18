import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar=()=>{
    return <div className="border-b flex justify-between px-10 min-h-15 items-center w-screen">
        <Link to={'/blogs'} className="cursor-pointer">Medium</Link>
        <div className="flex justify-between gap-65">
            <Link to={"/publish"}><button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button></Link>
            <div className="pt-2"><Avatar name="Vignesh"/></div>
        </div>
    </div>
}
import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog=({blog}:{blog:Blog})=>{
    return (
        <div>
            <Appbar/>
            <div className="flex justify-center pt-10">
                <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl ">
                    <div className="col-span-8">
                        <div className="text-4xl font-extrabold pt-15">
                            {blog.title}
                        </div>
                        <div className="text-slate-300 pt-3">
                            Posted on 10-Nov-2025
                        </div>
                        <div className="pt-3">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div>
                            Author
                        </div>
                        <div className="flex pt-10 w-full ">
                            <Avatar name={blog.author.email}/>
                            <div className="text-xl font-bold pl-6">
                                {blog.author.email}
                            </div>
                        </div>
                        <div className="pt-x text-slate-500 pt-2">
                            Random catch phrase about the authors ability to create and post about stuff which is cool on internet
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
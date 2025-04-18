import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if(loading)
    {
        return <div>
            <Appbar/>
            <div className="flex w-screen h-screen justify-center items-center">
                <div>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            </div>
        </div>
    }
    return  <div> 
        <Appbar/>
        <div className="flex justify-center">
            <div>
                {blogs && blogs.map(blog=><BlogCard id={blog.id} key={blog.id} authorName={blog.author.email} title={blog.title} content={blog.content} publishedDate="2-feb-2024"/>)}

            </div>
        </div>
    </div>
}
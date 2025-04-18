import { useSearchParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";

export function Blog(){
    const [searchParams]=useSearchParams()
    const id=searchParams.get("id");
    const {loading,blog}=useBlog({id:String(id)});
    if (!id || !blog) {
        return <div>No blog ID provided</div>;
    }
    if(loading)
    {
        return <div>
            loading.....
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
}
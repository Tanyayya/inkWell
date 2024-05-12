import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { Skeleton } from "../components/Skeleton"

export const Blogs = () =>{

    const {loading,blogs}=useBlogs();

    if(loading)
    {
        return <div>
            <Appbar></Appbar>
            <div className="flex justify-center flex-col p-8" >
            <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
            </div>
       
    </div>
    }
    return <div>
        <Appbar>
        </Appbar>
        <div className="flex justify-center">
        <div >
            {blogs.map(blog=> <BlogCard 
            id={blog.id}
            authorName={blog.author.name||"Anonymous"}
       title={blog.title}
       content={blog.content}
       publishedDate={"2nd feb 2024"}></BlogCard>)}
       
    </div>
    </div>
    </div>
}
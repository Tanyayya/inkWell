import { Appbar } from "./Appbar";
import { Blogs } from "../hooks";
import { Avatar, Circle } from "./BlogCard";
import dateFormat from 'dateformat';
import { decode } from "hono/jwt";
import { Link } from "react-router-dom";

export interface BlogID {
  title: string;
  content: string;
  anonymous: boolean;
  id: string;
}

export const CompleteBlog = ({ blog }: { blog: Blogs }) => {
  const token = localStorage.getItem("token");

  const { payload } = decode(token || "");
  const userId = payload.id;

  const name = blog.anonymous ? "Anonymous" : blog.author.name;

  return (
    <div className="">
      <Appbar />
      <div className="flex justify-center flex-grow items-center p-8 m-auto">
        <div className="flex justify-center flex-col max-w-[800px]  bg-slate-100 p-2">
          <div className="p-8">
            <Link to={`/editPost/${blog.id}`}>
              {userId == blog.author.id ? (
                <button
                  type="button"
                  className="text-gray-900 bg-slate-200 hover:text-white border border-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Edit Post
                </button>
              ) : null}
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <div className="px-10 p-12">
              <div className="">
                <div className="text-5xl font-extrabold">{blog.title}</div>
                <div className="">
                  <div className="flex py-4">
                    <div className="pr-4 flex-col justify-center">
                      <Avatar size="big" name={name}></Avatar>
                    </div>
                    <div>
                      <div className="py-2 text-md">{name}</div>
                    </div>
                  </div>
                </div>
                <div className="flex text-slate-500 pt-4">
                  <div className="flex justify-center flex-col">
                    {`${Math.ceil(blog.content.length / 100)} min read`}
                  </div>
                  <div className="flex justify-center flex-col pl-2">
                    <Circle></Circle>
                  </div>
                  <div className="flex justify-center flex-col pl-2">
                    {dateFormat(blog.publishedDate, "mmmm dS, yyyy")}
                  </div>
                </div>
                <div className="pt-4">{blog.content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

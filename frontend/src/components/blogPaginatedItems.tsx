import React, { useState } from "react";
import { BlogCard } from "../components/BlogCard";

import { Skeleton } from "../components/Skeleton";
import ReactPaginate from 'react-paginate';


interface Blog {
    id: string;
    title: string;
    content: string;
    publishedDate:string;
    author: {

      name: string | null;
      id:string
    };
    anonymous:boolean
  }

  interface BlogPaginatedItemsProps {
    loading: boolean;
    blogs: Blog[];
  }
  
  // Define the props for PaginatedItems component
  interface PaginatedItemsProps {
    itemsPerPage: number;
  }

export const BlogPaginatedItems :React.FC<BlogPaginatedItemsProps>=({
  loading,
  blogs
}) => {
    
 
  

  if (loading) {
    return (
      <div>
       
        <div className="flex justify-center flex-col p-8">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

 
  const Items: React.FC<{ blogItems: Blog[] }>  = ({ blogItems }) => {
   

    return (
      <>
        {blogItems.map((blog) => (
          <BlogCard
            key={blog.id} // Add a key prop for each item in the list
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            authorId={blog.author.id}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.publishedDate}
            anonymous={blog.anonymous}
            //anonymous={blog.anonymous}
          />
        ))}
      </>
    );
  };

  const PaginatedItems: React.FC<PaginatedItemsProps>  = ({ itemsPerPage }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    
    const blogItems = blogs.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(blogs.length / itemsPerPage);

    const handlePageClick = (event:{selected:number}) => {
      const newOffset = (event.selected * itemsPerPage) % blogs.length;
      
      setItemOffset(newOffset);
    };

    return (
      <div>
       
        <div className="flex justify-center flex-col items-center">
          <Items blogItems={blogItems} />
          <ReactPaginate className="  max-w-screen-md justify-around text-slate-500 p-4 font-bold  flex pb-4 w-screen cursor-pointer"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    );
  };

  return <PaginatedItems itemsPerPage={5} />;
};

export default BlogPaginatedItems;

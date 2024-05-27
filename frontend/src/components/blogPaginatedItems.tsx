import React, { useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";
import ReactPaginate from 'react-paginate';


interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
      name: string | null;
    };
  }

  
  
  // Define the props for PaginatedItems component
  interface PaginatedItemsProps {
    itemsPerPage: number;
  }

const BlogPaginatedItems = () => {
    
  const { loading, blogs } = useBlogs();
  const publishedDate = new Date().toString();

  if (loading) {
    return (
      <div>
        <Appbar />
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
            title={blog.title}
            content={blog.content}
            publishedDate={publishedDate}
          />
        ))}
      </>
    );
  };

  const PaginatedItems: React.FC<PaginatedItemsProps>  = ({ itemsPerPage }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const blogItems = blogs.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(blogs.length / itemsPerPage);

    const handlePageClick = (event:{selected:number}) => {
      const newOffset = (event.selected * itemsPerPage) % blogs.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <div>
        <Appbar />
        <div className="flex justify-center flex-col ">
          <Items blogItems={blogItems} />
          <ReactPaginate className=" justify-around text-slate-500 p-4 font-bold  flex pb-4 w-screen cursor-pointer"
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

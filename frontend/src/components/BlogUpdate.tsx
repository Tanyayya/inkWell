import {  useState,useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { PostEditor } from "./PostEditor";
import 'react-quill/dist/quill.snow.css';



export const BlogUpdate = ({ blog }: { blog: Blog }) => {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.content);
  const [published, setPublished] = useState(true);
  const [anonymous, setAnonymous] = useState(blog.anonymous);

  const navigate = useNavigate();
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handlePublishedChange = useCallback(() => {
    setPublished((prev) => !prev);
  }, []);

  const handleAnonymousChange = useCallback(() => {
    setAnonymous((prev) => !prev);
  }, []);

  

  const handleSave = useCallback(async () => {
    try {
       await axios.put(
          `${BACKEND_URL}/api/vi/blog/${blog.id}`,
          {
            title,
            content: description,
            published,
            anonymous,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
      );
      navigate(`/blog/${blog.id}`);
    } catch (error) {
      console.error("Error saving the post:", error);
    }
  }, [blog.id, title, description, published, anonymous, navigate]);
  const handleEditorChange = useCallback((value: string) => {
    setDescription(value);
  }, []);
  return (
    <div>
        <Appbar></Appbar>
        <PostEditor
        handleAnonymousChange={handleAnonymousChange}
        handlePublishedChange={handlePublishedChange}
        handleSave={handleSave}
        handleTitleChange={handleTitleChange}
        handleEditorChange={handleEditorChange}
        anonymous={anonymous}
        published={published}
        title={title}
        description={description}
      />
    </div>
  );
};

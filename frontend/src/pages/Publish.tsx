import  { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PostEditor } from "../components/PostEditor";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [anonymous, setAnonymous] = useState(false);

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

  const handleEditorChange = useCallback((value:string) => {
    setDescription(value);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/vi/blog`,
        { title, content: description, published, anonymous },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Error saving the post:", error);
    }
  }, [title, description, published, anonymous, navigate]);

  return (
    <div>
     
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
  )}
import { useCallback, useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { PostEditor } from "../components/PostEditor";
import { Appbar } from "../components/Appbar";

import { useParams } from "react-router-dom";
import { useRealTimeBlog } from "../hooks";
import { Loader } from "../components/Loader";

export const RealTimePublish = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, rBlog } = useRealTimeBlog({ id: id || "" });
 
  const [description, setDescription] = useState(rBlog?.content||"");
  const [published, setPublished] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  
  const [title, setTitle] = useState(rBlog?.title||"");
  
  const navigate = useNavigate();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (rBlog) {
      setDescription(rBlog.content);
      setAnonymous(rBlog.anonymous);
      setTitle(rBlog.title);
     
    }
  }, [rBlog]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ id, type: "title", value: e.target.value }));
      }
    },
    [id]
  );

  const handlePublishedChange = useCallback(() => {
    setPublished((prev) => !prev);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ type: "published", value: !published })
      );
    }
  }, [published]);

  const handleAnonymousChange = useCallback(() => {
    setAnonymous((prev) => !prev);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ type: "anonymous", value: !anonymous })
      );
    }
  }, [anonymous]);

  const handleEditorChange = useCallback((value: string) => {
    setDescription(value);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ id, type: "content", value }));
    }
  }, [id]);

  const handleSave =(async () => {
    setPublished(true);
    navigate(`/collaboratedPost/${id}`)
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "title":
          setTitle(data.value);
          break;
        case "description":
          setDescription(data.value);
          break;
        case "published":
          setPublished(data.value);
          break;
        case "anonymous":
          setAnonymous(data.value);
          break;
        default:
          console.log("Unknown message type:", data.type);
      }
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  if (loading) {
    return (
      <div>
        <Appbar />
        <Loader message="Loading Blog" />
      </div>
    );
  }

  return (
    <div>
      <Appbar />
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

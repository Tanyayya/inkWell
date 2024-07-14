import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostEditor } from "../components/PostEditor";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

export const RealTimePublish = () => {
  const [title, setTitle] = useState("");
  const { id } = useParams(); 
 
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [anonymous, setAnonymous] = useState(false);
  const navigate = useNavigate();
  const wsRef = useRef<WebSocket | null>(null);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ id, type: "title", value: e.target.value }));
      }
    },
    []
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
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/`,
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

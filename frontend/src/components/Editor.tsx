import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar from "./EditorToolbar";
import { formats } from "./formats";
import { modules } from "./modules";
import "react-quill/dist/quill.snow.css";


interface EditorProps {
    value: string;
    onChange: (value: string) => void;
  }

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
    const handleChange = (content: string) => {
      onChange(content);
    };

  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
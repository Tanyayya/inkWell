import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar from "./EditorToolbar";
import { formats } from "./formats";
import { modules } from "./modules";
import "react-quill/dist/quill.snow.css";
import { useEffect,useRef,useCallback } from "react";


interface EditorProps {
    value: string;
    onChange: (value: string) => void;
  }

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<ReactQuill | null>(null);

  // Handle content changes
  const handleChange = useCallback((content: string) => {
    console.log("Editor content changed:", content);
    onChange(content);
  }, [onChange]);

  // Handle remote updates with a delay to prevent conflicts
  useEffect(() => {
    if (editorRef.current) {
      // Temporarily disable updates to avoid conflicting with local changes
      const editor = editorRef.current.getEditor();
      editor.disable();
      editor.root.innerHTML = value;
      editor.enable();
    }
  }, [value]);
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
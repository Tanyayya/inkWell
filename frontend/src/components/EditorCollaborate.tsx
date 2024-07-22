import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import EditorToolbar from "./EditorToolbar";
import { formats } from "./formats";
import { modules } from "./modules";
import "react-quill/dist/quill.snow.css";

interface EditorCollaborateProps {
    value: string;
    onChange: (value: string, line: number) => void;
    lockedLine: number | null;
    onLineLock: (line: number) => void;
    onLineUnlock: (line: number) => void;
}

const EditorCollaborate: React.FC<EditorCollaborateProps> = ({
    value,
    onChange,
    lockedLine,
    onLineLock,
    onLineUnlock
}) => {
    const quillRef = useRef<ReactQuill | null>(null);

    useEffect(() => {
        const quill = quillRef.current?.getEditor();

        const handleSelectionChange = (range: any) => {
            if (range) {
                const line = getLineNumberFromQuillRange(range);
                if (line !== null) {
                    if (lockedLine === null) {
                        onLineLock(line);
                    } else if (line !== lockedLine) {
                        onLineUnlock(lockedLine);
                        onLineLock(line);
                    }
                }
            }
        };

        if (quill) {
            quill.on('selection-change', handleSelectionChange);
        }

        return () => {
            if (quill) {
                quill.off('selection-change', handleSelectionChange);
            }
        };
    }, [lockedLine, onLineLock, onLineUnlock]);

    const handleChange = (content: string) => {
        const quill = quillRef.current?.getEditor();
        const range = quill?.getSelection();
        const line = range ? getLineNumberFromQuillRange(range) : 0;
        onChange(content, line||0);
    };

    const getLineNumberFromQuillRange = (range: any): number | null => {
        if (range && quillRef.current) {
            const quill = quillRef.current.getEditor();
            const [line] = quill.getLine(range.index);
            // You might need to adjust this part based on how your content is structured
            return line ? parseInt(line.text, 10) : null;
        }
        return null;
    };

    return (
        <div className="text-editor">
            <EditorToolbar />
            <ReactQuill
                ref={quillRef}
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

export default EditorCollaborate;

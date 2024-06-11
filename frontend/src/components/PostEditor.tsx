import React from "react";
import Editor from "../components/Editor";

interface PostEditorProps {
    handleAnonymousChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePublishedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditorChange: (value: string) => void;
    handleSave: () => void;
    published: boolean;
    anonymous: boolean;
    title: string;
    description: string;
  }
  
  export const PostEditor: React.FC<PostEditorProps> = ({
  handleAnonymousChange,
  handlePublishedChange,
  handleTitleChange,
  handleEditorChange,
  published,
  anonymous,
  title,
  description,
  handleSave,
}) => (
  <div className="flex flex-col">
    <div className="flex justify-center items-center flex-grow py-4">
      <div className="flex flex-col justify-center w-full max-w-screen-md bg-white p-2 rounded-lg shadow-lg">
        <div className="flex mb-4">
          <Checkbox
            id="publish-checkbox"
            label="Publish"
            checked={published}
            onChange={handlePublishedChange}
          />
          <Checkbox
            id="anonymous-checkbox"
            label="Post Anonymously"
            checked={anonymous}
            onChange={handleAnonymousChange}
          />
        </div>
        <input
          onChange={handleTitleChange}
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-slate-200 focus:outline-none text-gray-900 text-md block w-full p-2"
          placeholder="Title"
          value={title}
        />
        <div>
          <Editor value={description} onChange={handleEditorChange} />
        </div>
        <div className="bg-white py-4">
          <button
            onClick={handleSave}
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800"
          >
            Save Post
          </button>
          <p className="ms-auto text-xs text-gray-500 dark:text-gray-400 py-2">
            Remember, contributions to this topic should follow our{" "}
            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
              Community Guidelines
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </div>
);

interface checkboxProps {
    id:string,
    label:string,
    checked:boolean,
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<checkboxProps> = ({
    id,
    label,
    checked,
    onChange
  }) => (
  <div className="flex items-center p-2">
    <input
      onChange={onChange}
      id={id}
      type="checkbox"
      checked={checked}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    />
    <label className="ms-2 text-sm font-medium text-gray-900" htmlFor={id}>
      {label}
    </label>
  </div>
);

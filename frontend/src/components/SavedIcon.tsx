import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";



export const SavedIcon = ({ id,  saved }: { id: string, saved: boolean }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [currentSaved, setCurrentSaved] = useState<boolean>(saved);

  useEffect(() => {
    setCurrentSaved(saved); // Initialize with the saved status from props
  }, [saved]); // Update when 'saved' prop changes

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaving(true); // Set loading state
    try {
      await axios.post(`${BACKEND_URL}/api/vi/blog/save`, { postId: id }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setIsSaving(false); // Reset loading state
      setCurrentSaved(true); // Update saved status locally
    } catch (error) {
      console.error("Error saving post:", error);
      setIsSaving(false); // Reset loading state on error
    }
  };

  const handleUnsave = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaving(true); // Set loading state
    try {
      await axios.post(`${BACKEND_URL}/api/vi/blog/unsave`, { postId: id }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setIsSaving(false); // Reset loading state
      setCurrentSaved(false); // Update saved status locally
    } catch (error) {
      console.error("Error unsaving post:", error);
      setIsSaving(false); // Reset loading state on error
    }
  };

  return (
    <div className="flex items-center">
    {!currentSaved ? (
      <img
        onClick={handleSave}
        src="/save.png"
        className={`h-5 cursor-pointer ${isSaving ? "opacity-50" : ""}`}
        alt="Save Icon"
      />
    ) : (
      <img
        onClick={handleUnsave}
        src="/unsave.png"
        className={`h-5 cursor-pointer ${isSaving ? "opacity-50" : ""}`}
        alt="Unsave Icon"
      />
    )}
    </div>
  );
};

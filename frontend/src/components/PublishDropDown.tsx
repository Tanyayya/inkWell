import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

export const PostsDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleCollaborateClick = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/vi/blog`,
        { title: "", content: "" },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      navigate(`/collaborate/${response.data.id}`);
    } catch (error) {
      console.error("Error creating collaborative post:", error);
    }
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="relative inline-block" onMouseLeave={handleMouseLeave}>
      <button
        onMouseEnter={handleMouseEnter}
        type="button"
        className="mr-6 text-gray-900 bg-slate-200 hover:text-white border border-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Publish
      </button>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute right-0 mt-2 z-10 ${
          dropdownVisible ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link to={"/publish"}>
              <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Go Solo
              </span>
            </Link>
          </li>
          <li>
            <span
              onClick={handleCollaborateClick}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              Collaborate
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

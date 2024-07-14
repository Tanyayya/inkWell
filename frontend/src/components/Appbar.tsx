import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useEffect,useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Appbar = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    setName(storedName);
  }, []);

  return (
    <div className="max-w-screen-xl border-b flex flex-wrap items-center justify-between mx-auto px-10 py-4">
      <Link className="flex" to={"/blogs"}>
        <img src="/logo.avif" className="h-12 mr-2" alt="Flowbite Logo" />
        <div className="flex justify-center flex-row cursor-pointer self-center text-2xl font-semibold">
          InkWell
        </div>
      </Link>

      <div>
        <PostsDropdown />

        <Dropdown id="dropdownDefaultButton" size={"big"} name={name} />
      </div>
    </div>
  );
};

interface DropdownProps {
  id: string;
  name: string;
  size?: "small" | "big";
}

function Dropdown({ id, size, name }: DropdownProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="relative inline-block">
      <Avatar id={id} size={size} name={name} onClick={toggleDropdown} />
      <div
        className={`absolute right-0 mt-2 z-10 ${
          dropdownVisible ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={id}
        >
          <Link to={"/me"}>
            <li>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Profile
              </a>
            </li>
          </Link>
          <li>
            <a
              href="/signin"
              onClick={() => {
                localStorage.clear();
                window.location.reload(); // Reload to ensure the state is updated
              }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Signout
            </a>
          </li>
          <li>
            <a
              href="/drafts"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Drafts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function PostsDropdown() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCollaborateClick = async () => {
    try {
      
      const response = await axios.post(
        `${BACKEND_URL}/api/vi/blog`,
        { title:"", content: "" },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response)
      navigate(`/collaborate/${response.data.id}`);
      // Navigate to the collaborate page or perform other actions
     //window.location.href = '/publish/collaborate'; // Example: Navigate to collaborate page
    } catch (error) {
      console.error('Error creating collaborative post:', error);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        type="button"
        className="mr-6 text-gray-900 bg-slate-200 hover:text-white border border-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Publish
      </button>
      <div
        className={`absolute right-0 mt-2 z-10 ${
          dropdownVisible ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link to={"/publish"}>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Go Solo
              </a>
            </Link>
          </li>
          <li>
            <a
              onClick={handleCollaborateClick}
              
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Collaborate
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Appbar;

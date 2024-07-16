import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState,useRef,useEffect } from "react";


interface DropdownProps {
    id: string;
    name: string;
    size?: "small" | "big";
  }

export const Dropdown=({ id, size, name }: DropdownProps) =>{
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        setDropdownVisible((prev) => !prev);
      };
    
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setDropdownVisible(false);
        }
      };
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
  
    return (
      <div className="relative inline-block">
        <Avatar id={id} size={size} name={name}  onClick={handleButtonClick} />
        <div ref={dropdownRef}
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
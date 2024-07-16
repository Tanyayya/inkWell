import { Link } from "react-router-dom";
import { Dropdown } from "./UserDropDown";
import { useEffect,useState } from "react";
import { PostsDropdown } from "./PublishDropDown";

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





export default Appbar;
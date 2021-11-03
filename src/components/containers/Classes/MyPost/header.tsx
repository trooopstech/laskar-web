import useStyle from "context/styleContext";
import { CgFeed } from "react-icons/cg";

const MyPostHeader = () => {
  const { isSidebarOpen } = useStyle();

  return (
    <header
      className="w-full py-3 px-3 bg-gray-800 flex justify-between items-center shadow-sm border-b border-gray-600"
      style={{
        minWidth: isSidebarOpen ? "80vw" : "",
      }}
    >
      <p className="text-xl text-white mr-2 flex items-center">
        <CgFeed />
        <span className="ml-2">halamanku</span>
      </p>
    </header>
  );
};

export default MyPostHeader;

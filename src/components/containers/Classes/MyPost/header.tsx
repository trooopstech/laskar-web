import { CgFeed } from "react-icons/cg";

const MyPostHeader = () => {
  return (
    <header className="w-full py-3 px-3 bg-gray-800 flex justify-between items-center shadow-sm border-b border-gray-700">
      <p className="text-xl text-white mr-2 flex items-center">
        <CgFeed />
        <span className="ml-2">halamanku</span>
      </p>
    </header>
  );
};

export default MyPostHeader;

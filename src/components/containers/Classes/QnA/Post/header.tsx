import { FaChevronLeft } from "react-icons/fa";
import { useHistory } from "react-router";

const PostHeader = () => {
  const history = useHistory();

  return (
    <header className="w-full py-3 px-3 bg-gray-800 flex justify-between items-center shadow-sm border-b border-gray-700">
      <p className="text-xl text-white mr-2 flex items-center">
        <FaChevronLeft
          onClick={() => history.goBack()}
          className="cursor-pointer"
        />
        <span className="ml-2">Komentar</span>
      </p>
    </header>
  );
};

export default PostHeader;

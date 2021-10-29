import useQnA from "context/QnA";
import useStyle from "context/styleContext";
import { FaQuestion } from "react-icons/fa";

const QnAHeader = () => {
  const { qna } = useQnA();
  const { isSidebarOpen } = useStyle();

  return (
    <header
      className="w-full py-3 px-3 bg-gray-800 flex justify-between items-center shadow-sm border-b border-gray-700"
      style={{
        minWidth: isSidebarOpen ? "80vw" : "",
      }}
    >
      <p className="text-xl text-white mr-2 flex items-center">
        <FaQuestion />
        <span className="ml-2">{qna?.name}</span>
      </p>
    </header>
  );
};

export default QnAHeader;

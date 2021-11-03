import useQnA from "context/QnA";
import useStyle from "context/styleContext";
import { FaQuestion } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const QnAHeader = () => {
  const { qna, loading } = useQnA();
  const { isSidebarOpen } = useStyle();

  return (
    <header
      className="w-full py-3 px-3 bg-gray-800 flex justify-between items-center shadow-sm border-b border-gray-600"
      style={{
        minWidth: isSidebarOpen ? "80vw" : "",
      }}
    >
      {loading ? (
        <Skeleton height={25} width={150} />
      ) : (
        <p className="text-xl text-white mr-2 flex items-center">
          <FaQuestion />
          <span className="ml-2">{qna?.name}</span>
        </p>
      )}
    </header>
  );
};

export default QnAHeader;

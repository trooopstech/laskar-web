import useChat from "context/Chat";
import { FaHashtag } from "react-icons/fa";

const ChatHeader = () => {
  const { chatGroup } = useChat();

  return (
    <header className="w-full py-3 px-3 bg-gray-800 flex justify-between items-center shadow-sm border-b border-gray-700">
      <p className="text-xl text-white mr-2 flex items-center">
        <FaHashtag />
        <span className="ml-2">{chatGroup?.name}</span>
      </p>
    </header>
  );
};

export default ChatHeader;

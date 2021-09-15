import useChat from "context/Chat";
import { FiHash } from "react-icons/fi";

const ChatHeader = () => {
  const { chatGroup } = useChat();

  return (
    <header className="w-full py-3 px-3 bg-gray-800 flex justify-between items-center shadow-sm border-b border-gray-600">
      <p className="text-xl text-white mr-2 flex items-center">
        <FiHash />
        <span className="ml-2">{chatGroup?.name}</span>
      </p>
    </header>
  );
};

export default ChatHeader;

import ChatEditor from "components/modules/Editor/Chat";
import useStyle from "context/styleContext";

const ChatInput = ({ virtuoso }: { virtuoso: any }) => {
  const { isSidebarOpen } = useStyle();

  return (
    <div
      className="px-2 pb-2 w-full flex items-center justify-center relative"
      style={{ minWidth: isSidebarOpen ? "80vw" : "" }}
    >
      <div className="w-full flex pb-4">
        <ChatEditor virtuoso={virtuoso} />
      </div>
    </div>
  );
};

export default ChatInput;

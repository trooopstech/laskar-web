import ChatEditor from "components/modules/Editor/Chat";

const ChatInput = () => {
  return (
    <div className="px-2 pb-2 w-full flex items-center justify-center relative">
      <div className="w-full flex pb-4">
        <ChatEditor />
      </div>
    </div>
  );
};

export default ChatInput;

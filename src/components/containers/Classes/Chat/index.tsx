import { ChatProvider } from "context/Chat";
import { useParams } from "react-router";
import ChatBody from "./body";
import ChatHeader from "./header";
import ChatInput from "./input";

const ChatContainer = () => {
  // @ts-ignore
  const { channelId } = useParams();

  return (
    <ChatProvider id={channelId}>
      <div
        className="w-full h-full relative overflow-hidden flex flex-col"
        key={channelId}
      >
        <ChatHeader />
        <ChatBody />
        <ChatInput />
      </div>
    </ChatProvider>
  );
};

export default ChatContainer;

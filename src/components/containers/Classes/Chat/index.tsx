import { ChatProvider } from "context/Chat";
import { useRef } from "react";
import { useParams } from "react-router";
import ChatBody from "./body";
import ChatHeader from "./header";
import ChatInput from "./input";

const ChatContainer = () => {
  // @ts-ignore
  const { channelId } = useParams();
  const virtuoso = useRef(null);

  return (
    <ChatProvider id={channelId}>
      <div
        className="w-full h-full relative overflow-hidden flex flex-col"
        key={channelId}
      >
        <ChatHeader />
        <ChatBody virtuoso={virtuoso} />
        <ChatInput virtuoso={virtuoso} />
      </div>
    </ChatProvider>
  );
};

export default ChatContainer;

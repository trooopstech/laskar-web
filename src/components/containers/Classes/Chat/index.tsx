import { ChatProvider } from "context/Chat";
import useStyle from "context/styleContext";
import { useRef } from "react";
import { useParams } from "react-router";
import ChatBody from "./body";
import ChatHeader from "./header";
import ChatInput from "./input";

const ChatContainer = () => {
  // @ts-ignore
  const { channelId } = useParams();
  const virtuoso = useRef(null);
  const { isSidebarOpen } = useStyle();

  return (
    <ChatProvider id={channelId}>
      <div
        className={`${
          isSidebarOpen ? "w-16" : "w-full"
        } h-full relative overflow-hidden flex flex-col border-gray-700 border-l sm:border-l-0`}
        style={{ overflowX: "hidden" }}
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

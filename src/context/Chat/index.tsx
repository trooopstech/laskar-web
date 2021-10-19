import { useLazyQuery, useQuery } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GET_CHAT_GROUP } from "schema/channels/chat";
import { ChatGroup, GroupMessages, GroupMessagesInput } from "types/chat";
import useSendMessage from "./hooks/useSendMessage";
import useOnNewMessage from "./subscription/useOnNewMessage";

interface ChatContextType {
  chatGroup?: ChatGroup;
  loading: boolean;
  error?: any;
  createMessagesLoading: boolean;
  sendMessages: (data: GroupMessagesInput) => void;
  getSenderRole: (message: GroupMessages) => string;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export function ChatProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}): JSX.Element {
  const [chatGroup, setChatGroup] = useState<ChatGroup>();
  const { data, loading, error } = useQuery(GET_CHAT_GROUP, {
    variables: {
      channelId: id,
    },
    fetchPolicy: "cache-and-network",
  });
  const { message } = useOnNewMessage(id);
  const { createMessages, createMessagesLoading } = useSendMessage();

  useEffect(() => {
    if (data) {
      setChatGroup({
        ...data.getChatGroup,
        group_messages: [...data.getChatGroup.group_messages].reverse(),
      });
    }
  }, [data]);

  useEffect(() => {
    if (message && message.onNewMessage.chat_group_id === chatGroup?.id) {
      setChatGroup({
        ...(chatGroup as ChatGroup),
        group_messages: [
          ...(chatGroup?.group_messages as GroupMessages[]),
          message.onNewMessage as GroupMessages,
        ],
      });
    }
  }, [message]);

  const sendMessages = async (data: GroupMessagesInput): Promise<void> => {
    try {
      await createMessages({
        variables: {
          data: { ...data, chat_group_id: chatGroup?.id },
          channelId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSenderRole = (message: GroupMessages): string => {
    const student = message.sender.member_role.filter(
      (member) => member.role.name === "STUDENT"
    );

    if (student.length > 0) {
      return "STUDENT";
    }

    const assistant = message.sender.member_role.filter(
      (member) => member.role.name === "ASSISTANT"
    );

    if (assistant.length > 0) {
      return "ASSISTANT";
    }

    return "TEACHER";
  };

  const memoedValue = useMemo(
    () => ({
      chatGroup,
      loading,
      error,
      createMessagesLoading,
      sendMessages,
      getSenderRole,
    }),
    [chatGroup, loading, error, createMessagesLoading]
  );

  return (
    <ChatContext.Provider value={memoedValue}>{children}</ChatContext.Provider>
  );
}

const useChat = () => {
  return useContext(ChatContext);
};

export default useChat;

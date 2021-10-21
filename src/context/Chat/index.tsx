import { useLazyQuery } from "@apollo/client";
import moment from "moment";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GET_CHAT_GROUP_BY_PAGE } from "schema/channels/chat";
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
  getMessageByPage: () => void;
  page: number;
  hasMore: boolean;
  needScroll: boolean;
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
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [needScroll, setNeedScroll] = useState(true);
  const [getChat, { data, loading, error }] = useLazyQuery(
    GET_CHAT_GROUP_BY_PAGE,
    {
      fetchPolicy: "network-only",
    }
  );
  const { message } = useOnNewMessage(id);
  const { createMessages, createMessagesLoading } = useSendMessage();

  useEffect(() => {
    getChat({
      variables: {
        channelId: id,
        page: 0,
      },
    });
    setPage(0);
    setChatGroup(undefined);
    setHasMore(true);
    setNeedScroll(true);
  }, [id]);

  useEffect(() => {
    if (data) {
      if (
        (data.getChatGroupByMessagePage as ChatGroup).group_messages.length ===
        0
      ) {
        setHasMore(false);
        if (page > 0) {
          return;
        }
      }

      const dates: string[] = [];

      const oldMessage = (chatGroup?.group_messages as GroupMessages[]) ?? [];
      const newMessage = [
        ...(data.getChatGroupByMessagePage as ChatGroup).group_messages,
      ].reverse();

      const result = [
        ...newMessage,
        ...oldMessage.map((message) => ({ ...message, treshold: false })),
      ] as GroupMessages[];

      setChatGroup({
        ...(data.getChatGroupByMessagePage as ChatGroup),
        group_messages: result.map((message) => {
          const createdAt = moment(new Date(message.created_at)).format(
            "MMMM Do YYYY"
          );

          if (dates.indexOf(createdAt) < 0) {
            dates.push(createdAt);
            console.log(dates);
            return {
              ...message,
              treshold: true,
            };
          }

          return message;
        }),
      });
      setPage(page + 1);
      setNeedScroll(false);
    }
  }, [data]);

  useEffect(() => {
    if (message && message.onNewMessage.chat_group_id === chatGroup?.id) {
      const result = [
        ...(chatGroup?.group_messages as GroupMessages[]).map((message) => ({
          ...message,
          treshold: false,
        })),
        message.onNewMessage as GroupMessages,
      ] as GroupMessages[];

      const dates: string[] = [];

      setChatGroup({
        ...(chatGroup as ChatGroup),
        group_messages: result.map((message) => {
          const createdAt = moment(new Date(message.created_at)).format(
            "MMMM Do YYYY"
          );

          if (dates.indexOf(createdAt) < 0) {
            dates.push(createdAt);
            console.log(dates);
            return {
              ...message,
              treshold: true,
            };
          }

          return message;
        }),
      });
    }
  }, [message]);

  const getMessageByPage = () => {
    getChat({
      variables: {
        channelId: id,
        page: page,
      },
    });
  };

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
      getMessageByPage,
      page,
      hasMore,
      needScroll,
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

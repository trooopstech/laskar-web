import useChat from "context/Chat";
import useClassDetail from "hooks/useDetailClass";
import moment from "moment";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Skeleton from "react-loading-skeleton";
import { Descendant, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { GroupMessages } from "types/chat";
import { Virtuoso } from "react-virtuoso";
import { Element } from "components/modules/Editor/Common/element";
import { Leaf } from "components/modules/Editor/Common/toolbar";
import { getInitials } from "utils/getInitial";

interface MessageProps {
  message: GroupMessages;
}

const Message: React.FC<MessageProps> = React.memo(({ message }) => {
  const { getSenderRole } = useChat();
  const [value, setValue] = useState<Descendant[]>(message.text);
  const editor = useMemo(() => withReact(createEditor()), []);

  const senderRole = getSenderRole(message);

  editor.selection = {
    anchor: { path: [0, 0], offset: 0 },
    focus: { path: [0, 0], offset: 0 },
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const getColorByRole = () => {
    switch (senderRole) {
      case "STUDENT":
        return "text-green-300";
      case "ASSISTANT":
        return "text-blue-300";
      case "TEACHER":
        return "text-yellow-300";
      default:
        return "text-white";
    }
  };

  return (
    <div className="w-full">
      {message.treshold && (
        <div className="h-10 w-full flex justify-center items-center">
          <div className="p-2 rounded-full bg-gray-500">
            {moment(new Date(message.created_at)).format("MMM D YYYY")}
          </div>
        </div>
      )}
      <div className="flex m-2 items-start hover:bg-gray-600 p-2 rounded-md">
        <div className="w-13">
          <div
            className="avatar h-12 w-12 rounded-full mr-2 flex items-center justify-center"
            style={{ backgroundColor: message.sender.member.color }}
          >
            <p className="text-xl uppercase font-bold text-center text-white">
              {getInitials(message.sender.member.name as string)}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex items-center">
            <p className={`${getColorByRole()} text-bold`}>
              {message.sender.member.name}
            </p>
            <p className="text-xs text-gray-500 ml-4">
              {moment(new Date(message.created_at)).format("hh:mm A")}
            </p>
          </div>
          <div className="w-full">
            <p className="break-words break-all">
              <Slate
                editor={editor}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <Editable
                  readOnly
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                />
              </Slate>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

const ChatBody = React.memo(({ virtuoso }: { virtuoso: any }) => {
  const { chatGroup, getMessageByPage, hasMore, loading, page } = useChat();
  const { getUserClassMember } = useClassDetail();
  const classMember: ClassMember = getUserClassMember();

  const query = () => {
    if (loading) return;
    if (hasMore && !loading && page > 0) {
      getMessageByPage();
      virtuoso.current?.scrollToIndex({
        index: 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="flex-grow overflow-y-scroll overflow-x-hidden w-full py-4 border-gray-700"
      key={chatGroup?.id}
      style={{ maxHeight: "calc(100% - 7rem)" }}
    >
      {loading && <h1 className="text-center">Loading...</h1>}
      <Virtuoso
        data={chatGroup?.group_messages}
        ref={virtuoso}
        initialTopMostItemIndex={(chatGroup?.group_messages.length ?? 10) - 1}
        followOutput="smooth"
        startReached={query}
        atBottomStateChange={(bottom) => {
          if (bottom) {
            // @ts-ignore
            virtuoso.current?.scrollToIndex({
              index: (chatGroup?.group_messages.length ?? 10) - 1,
              behavior: "smooth",
            });
          }
        }}
        firstItemIndex={chatGroup?.group_messages.length as number}
        itemContent={(index, message) => {
          return (
            <Message
              message={message}
              key={message.id + classMember?.oid + index}
            />
          );
        }}
      />
    </div>
  );
});

export default ChatBody;

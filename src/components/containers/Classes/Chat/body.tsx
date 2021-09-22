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
import { Element } from "components/modules/Editor/Chat/element";
import { Leaf } from "components/modules/Editor/Chat/toolbar";

interface MessageProps {
  message: GroupMessages;
}

const Message: React.FC<MessageProps> = React.memo(({ message }) => {
  const { getSenderRole } = useChat();
  const [value, setValue] = useState<Descendant[]>(message.text);
  const editor = useMemo(() => withReact(createEditor()), []);

  const senderRole = getSenderRole(message);

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
    <div className="flex m-2 items-start hover:bg-gray-600 p-2 rounded-md">
      <div className="w-13">
        <div className="avatar h-12 w-12 rounded-full bg-red-300 mr-2"></div>
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
  );
});

const ChatBody = React.memo(() => {
  const { chatGroup } = useChat();
  const { getUserClassMember } = useClassDetail();
  const classMember: ClassMember = getUserClassMember();
  const virtuoso = useRef(null);

  return (
    <div
      className="flex-grow overflow-y-scroll overflow-x-hidden w-full py-4 border-gray-700"
      key={chatGroup?.id}
      style={{ maxHeight: "calc(100% - 7rem)" }}
    >
      <Virtuoso
        data={chatGroup?.group_messages}
        ref={virtuoso}
        initialTopMostItemIndex={(chatGroup?.group_messages.length ?? 1) - 1}
        followOutput="smooth"
        totalCount={chatGroup?.group_messages.length}
        itemContent={(index, message) => {
          return (
            <Message
              message={message}
              key={message.id + classMember.oid + index}
            />
          );
        }}
      />
    </div>
  );
});

export default ChatBody;

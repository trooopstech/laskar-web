import useChat from "context/Chat";
import useClassDetail from "hooks/useDetailClass";
import moment from "moment";
import React from "react";

interface MessageProps {
  message: GroupMessages;
}

const MyMessage: React.FC<MessageProps> = React.memo(({ message }) => {
  return (
    <div className="w-full flex m-2 justify-end items-end">
      <span className="mr-2 text-gray-400">
        {moment(new Date(message.created_at)).format("hh:mm A")}
      </span>
      <p
        className="p-2 text-black bg-gray-100 rounded-md break-words"
        style={{ maxWidth: "300px" }}
      >
        {message.text}
      </p>
    </div>
  );
});

const OtherMessage: React.FC<MessageProps> = React.memo(({ message }) => {
  return (
    <div className="w-full flex m-2">
      <div className="h-12 w-12 rounded-full bg-red-200 mr-4"></div>
      <div className="flex">
        <div>
          <p className="mb-1">{message.sender.member.name}</p>
          <p
            className="p-2 text-white bg-gray-600 rounded-md break-words"
            style={{ maxWidth: "300px" }}
          >
            {message.text}
          </p>
        </div>
        <div className="h-full flex items-end ml-2">
          <span className="mr-2 text-gray-400">
            {moment(new Date(message.created_at)).format("hh:mm A")}
          </span>
        </div>
      </div>
    </div>
  );
});

const ChatBody = React.memo(() => {
  const { chatGroup } = useChat();
  const { getUserClassMember } = useClassDetail();
  const classMember: ClassMember = getUserClassMember();

  return (
    <div
      className="flex-grow overflow-y-scroll overflow-x-hidden w-full p-4  border-gray-700"
      key={chatGroup?.id}
      style={{ maxHeight: "calc(100% - 7rem)" }}
    >
      {chatGroup?.group_messages.map((message) => {
        if (message.sender.oid === classMember.oid) {
          return (
            <MyMessage message={message} key={message.id + chatGroup.id} />
          );
        }

        return (
          <OtherMessage message={message} key={message.id + classMember.oid} />
        );
      })}
    </div>
  );
});

export default ChatBody;

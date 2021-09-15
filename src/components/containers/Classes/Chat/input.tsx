import { MdAddCircle } from "react-icons/md";
import { HiEmojiHappy } from "react-icons/hi";
import TextareaAutosize from "react-textarea-autosize";
import { Picker } from "emoji-mart";
import { useEffect, useState } from "react";
import useClassDetail from "hooks/useDetailClass";
import useChat from "context/Chat";

const EmojiPicker = ({
  open,
  setClose,
  setMessage,
}: {
  open: number;
  setClose: () => void;
  setMessage: (val: string) => void;
}) => {
  if (open > 0) {
    return (
      <div
        className="fixed h-screen w-screen bg-transparent top-0 left-0 z-10 shadow-sm"
        onClick={setClose}
      >
        <div
          className="p-10 rounded-sm z-100 absolute right-0 bottom-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Picker
            // @ts-ignore
            onSelect={(e) => setMessage(e.native)}
            theme="dark"
          />
        </div>
      </div>
    );
  }
  return null;
};

const ChatInput = () => {
  const [showEmoji, setShowEmoji] = useState(0);
  const [message, setMessage] = useState<string>("");
  const { getUserClassMember } = useClassDetail();
  const { sendMessages } = useChat();
  const classMember: ClassMember = getUserClassMember();

  const onEnter = async (event: {
    key: string;
    shiftKey: boolean;
    preventDefault: () => void;
  }) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (message !== "") {
        await sendMessages({
          text: message,
          html: `<p>${message}</p>`,
          type: "REGULAR" as unknown as MessageType,
          sender_id: classMember.oid,
        });
        setMessage("");
      }
    }
  };

  return (
    <div className="p-2 w-full flex items-center justify-center border-gray-600 border-t relative">
      <div className="w-full flex">
        <div className="flex bg-gray-700  px-2 rounded-lg w-full items-center">
          <MdAddCircle className="text-3xl mr-2" />
          <TextareaAutosize
            value={message}
            className="w-full bg-transparent border-0 rounded-lg focus:outline-none resize-none"
            maxRows={4}
            onChange={(e) => setMessage(e.target.value as string)}
            onKeyPress={onEnter}
          />
        </div>
        <div className="ml-2 flex items-center">
          <HiEmojiHappy
            className="text-3xl text-yellow-400 hover:text-yellow-500"
            onClick={() => setShowEmoji(1)}
          />
        </div>
      </div>
      <EmojiPicker
        setClose={() => setShowEmoji(0)}
        open={showEmoji}
        setMessage={(e) => setMessage(`${message}${e}`)}
      />
    </div>
  );
};

export default ChatInput;

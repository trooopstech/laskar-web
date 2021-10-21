// @refresh reset
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { Editor, Transforms, createEditor, Descendant } from "slate";

import isHotkey from "is-hotkey";
import {
  AiOutlineBold,
  AiOutlineUnderline,
  AiOutlineSmile,
  AiOutlineItalic,
  AiOutlineSend,
} from "react-icons/ai";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import { Picker } from "emoji-mart";
import useChat from "context/Chat";
import useClassDetail from "hooks/useDetailClass";
import {
  insertAttachment,
  insertImage,
  withAttachment,
  withShortcuts,
} from "../Common/plugin";
import { isMarkActive, Leaf, toggleMark } from "../Common/toolbar";
import { Element } from "../Common/element";
import { MessageType } from "types/chat";

import { Node } from "slate";
import ImageUploader from "../Common/image.upload";
import FileUploader from "../Common/file.upload";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const serialize = (nodes: any[]) => {
  const isThereAttachment =
    nodes.filter((n) => n.type === "image" || n.type === "attachment").length >
    0;

  if (isThereAttachment) {
    return "yes";
  }

  return nodes
    .map((n) => Node.string(n))
    .join("")
    .replace(/ /g, "");
};

const ChatEditor = ({ virtuoso }: { virtuoso: any }) => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(0);
  const [attachmentId, setAttachmentId] = useState<string>();
  const { getUserClassMember } = useClassDetail();
  const { sendMessages, createMessagesLoading, chatGroup } = useChat();
  const classMember: ClassMember = getUserClassMember();

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [value]);

  const editor = useMemo(
    () => withAttachment(withShortcuts(withReact(withHistory(createEditor())))),
    []
  );

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const addEmoji = async (emoji: string) => {
    // set cursor to the end
    Transforms.select(editor, {
      anchor: Editor.end(editor, []),
      focus: Editor.end(editor, []),
    });
    editor.insertText(emoji);
  };

  const addImage = async (url: string, id: string, key: string) => {
    Transforms.removeNodes(editor);
    insertImage(editor, url, key);
    // set cursor to the end
    Transforms.select(editor, {
      anchor: Editor.end(editor, []),
      focus: Editor.end(editor, []),
    });
    setAttachmentId(id);
  };

  const addAttachment = async (url: string, id: string, key: string) => {
    Transforms.removeNodes(editor);
    insertAttachment(editor, url, key);
    // set cursor to the end
    Transforms.select(editor, {
      anchor: Editor.end(editor, []),
      focus: Editor.end(editor, []),
    });
    setAttachmentId(id);
  };

  const onSend = async () => {
    if (!createMessagesLoading && serialize(value).length > 0) {
      sendMessages({
        text: JSON.stringify(value),
        html: ``,
        type: "REGULAR" as unknown as MessageType,
        sender_id: classMember.oid,
        attachment_id: attachmentId,
      });
      editor.selection = {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      };
      setValue(initialValue);
      virtuoso.current?.scrollToIndex({
        index: (chatGroup?.group_messages.length ?? 10) - 1,
        behavior: "smooth",
      });
      setAttachmentId(undefined);
    }
  };

  const onEnter = async (event: {
    key: string;
    shiftKey: boolean;
    preventDefault: () => void;
  }) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !createMessagesLoading &&
      serialize(value).length > 0
    ) {
      event.preventDefault();
      sendMessages({
        text: JSON.stringify(value),
        html: ``,
        type: "REGULAR" as unknown as MessageType,
        sender_id: classMember.oid,
        attachment_id: attachmentId,
      });
      editor.selection = {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      };
      setValue(initialValue);
      virtuoso.current?.scrollToIndex({
        index: (chatGroup?.group_messages.length ?? 10) - 1,
        behavior: "smooth",
      });
      setAttachmentId(undefined);
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      return;
    }

    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        // @ts-ignore
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <div className="w-full bg-gray-700  px-2 rounded-lg">
        <div
          className="flex  w-full items-center border-b border-gray-600 py-2"
          style={{
            maxHeight: "450px",
            overflowY: height > 450 ? "scroll" : "unset",
          }}
        >
          <div className="w-full max-w-full py-2" ref={ref}>
            <Editable
              renderLeaf={renderLeaf}
              placeholder="Tulis pesan..."
              style={{ padding: "8px" }}
              renderElement={renderElement}
              onKeyDown={onEnter}
              spellCheck
              autoFocus
            />
          </div>
        </div>
        <div className="w-full py-2 flex justify-between">
          <div id="toolbar" className="flex items-center">
            <FileUploader setUrl={addAttachment} />
            <ImageUploader setUrl={addImage} />
            <AiOutlineSmile
              className="text-xl text-gray-500 hover:text-gray-100 mr-2"
              onClick={() => setShowEmoji(1)}
            />
            <div className="h-full bg-gray-500 mr-2" style={{ width: "1px" }} />
            <AiOutlineBold
              className={`text-xl ${
                isMarkActive(editor, "bold") ? "text-gray-100" : "text-gray-500"
              } hover:text-gray-100 mr-2`}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "bold");
              }}
            />
            <AiOutlineUnderline
              className={`text-xl ${
                isMarkActive(editor, "underline")
                  ? "text-gray-100"
                  : "text-gray-500"
              } hover:text-gray-100 mr-2`}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "underline");
              }}
            />
            <AiOutlineItalic
              className={`text-xl ${
                isMarkActive(editor, "italic")
                  ? "text-gray-100"
                  : "text-gray-500"
              } hover:text-gray-100 mr-2`}
              onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, "italic");
              }}
            />
          </div>
          <div className="flex items-center">
            {createMessagesLoading ? (
              <div className=" flex justify-center items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-l-2 border-b-2 border-gray-500"></div>
              </div>
            ) : (
              <AiOutlineSend
                className="text-xl text-gray-500 hover:text-gray-100"
                onClick={onSend}
              />
            )}
          </div>
        </div>
      </div>
      <EmojiPicker
        setClose={() => setShowEmoji(0)}
        open={showEmoji}
        setMessage={addEmoji}
      />
    </Slate>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

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
          className="p-10 rounded-sm z-100 absolute bottom-3 left-12"
          onClick={(e) => e.stopPropagation()}
        >
          <Picker
            // @ts-ignore
            onSelect={(e) => setMessage(e.native)}
            theme="dark"
            emoji=""
          />
        </div>
      </div>
    );
  }
  return null;
};

export default ChatEditor;

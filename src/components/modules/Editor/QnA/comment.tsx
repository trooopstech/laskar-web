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
import { AiOutlineSend, AiOutlineSmile } from "react-icons/ai";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import { Picker } from "emoji-mart";
import { insertAttachment, insertImage, withShortcuts } from "../Common/plugin";
import { Leaf, toggleMark } from "../Common/toolbar";
import { Element } from "../Common/element";

import { Node } from "slate";
import Button from "components/elements/Button";
import useQnA from "context/QnA";
import useClassDetail from "hooks/useDetailClass";
import usePost from "context/QnA/Post";
import { serialize } from "../Chat";
import FileUploader from "../Common/file.upload";
import ImageUploader from "../Common/image.upload";
import EmojiPicker from "../Common/emoji.picker";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const CommentEditor = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { getUserClassMember } = useClassDetail();
  const [showEmoji, setShowEmoji] = useState(0);
  const { sendComment, createCommentLoading } = usePost();
  const member = getUserClassMember();
  const [isAnon, setIsAnon] = useState(false);
  const [attachmentId, setAttachmentId] = useState<string>();

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [value]);

  const editor = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
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
    if (!createCommentLoading && serialize(value).length > 0) {
      sendComment({
        text: JSON.stringify(value),
        sender_id: member.oid,
        is_anon: isAnon,
        attachment_id: attachmentId,
      });
      editor.selection = {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      };
      setValue(initialValue);
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
      serialize(value).length > 0
    ) {
      event.preventDefault();
      sendComment({
        text: JSON.stringify(value),
        sender_id: member.oid,
        is_anon: isAnon,
        attachment_id: attachmentId,
      });
      editor.selection = {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      };
      setValue(initialValue);
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
      <div className="w-full px-2">
        <div
          className="flex  w-full items-center"
          style={{
            maxHeight: "200px",
            overflowY: height > 200 ? "scroll" : "unset",
          }}
        >
          <div className="w-full max-w-full pt-2" ref={ref}>
            <Editable
              renderLeaf={renderLeaf}
              placeholder="Tulis komentarmu..."
              renderElement={renderElement}
              onKeyDown={onEnter}
              spellCheck
              autoFocus
            />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div id="toolbar" className="flex pt-2 items-center">
            <FileUploader setUrl={addAttachment} />
            <ImageUploader setUrl={addImage} />
            <AiOutlineSmile
              className="text-xl text-gray-500 hover:text-gray-100 mr-2"
              onClick={() => setShowEmoji(1)}
            />
            <div className="flex items-center justify-center ">
              <input
                type="checkbox"
                name="toggle"
                className="hidden"
                readOnly
                checked={isAnon}
              />
              <label
                className="relative w-8 h-4 flex select-none cursor-pointer items-center"
                htmlFor="toggle"
                onClick={() => setIsAnon(!isAnon)}
              >
                <span
                  className={`absolute left-0 top-0 h-full w-full rounded-full border border-gray-500 ${
                    isAnon
                      ? "bg-green-500 border-gray-300"
                      : "bg-gray-800 border-gray-500"
                  }`}
                ></span>
                <span
                  className={`h-3 w-3 absolute z-10 rounded-full  transition-transform duration-300 ease-in-out flex justify-center items-center  transform mx-1 ${
                    isAnon ? "translate-x-3 bg-gray-50" : "bg-gray-300"
                  }`}
                ></span>
              </label>
              <span className="text-xs text-gray-500 ml-1">Anonim</span>
            </div>
          </div>
          <div className="flex items-center">
            <AiOutlineSend
              className="text-xl text-gray-500 hover:text-gray-100"
              onClick={onSend}
            />
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

export default CommentEditor;

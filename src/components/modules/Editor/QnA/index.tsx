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
import { withShortcuts } from "../Common/plugin";
import { Leaf, toggleMark } from "../Common/toolbar";
import { Element } from "../Common/element";

import { Node } from "slate";
import useQnA from "context/QnA";
import useClassDetail from "hooks/useDetailClass";
import useMyPost from "context/QnA/MyPost";
import Button from "components/elements/Button";
import { Post } from "types/post";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const serialize = (nodes: any[]) => {
  return nodes
    .map((n) => Node.string(n))
    .join("")
    .replace(/ /g, "");
};

const QnAEditor = ({
  defaultValue,
  editMode,
  onCancel,
}: {
  defaultValue?: Descendant[];
  editMode?: Post;
  onCancel?: () => void;
}) => {
  const [value, setValue] = useState<Descendant[]>(
    defaultValue ?? initialValue
  );
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { getUserClassMember } = useClassDetail();
  const { sendPost, createPostLoading } = useQnA();
  const { updatingPost, updateLoading } = useMyPost();
  const [showEmoji, setShowEmoji] = useState(0);
  const member = getUserClassMember();
  const [isAnon, setIsAnon] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [value]);

  useEffect(() => {
    if (editMode) {
      setIsAnon(editMode.is_anon);
    }
  }, [editMode]);

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

  const onSend = async () => {
    if (!createPostLoading && serialize(value).length > 0) {
      sendPost({
        text: JSON.stringify(value),
        sender_id: member.oid,
        is_anon: isAnon,
      });
      editor.selection = {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      };
      setValue(initialValue);
    }
  };

  const onUpdate = async () => {
    if (!updateLoading && serialize(value).length > 0) {
      updatingPost(
        {
          text: JSON.stringify(value),
          id: editMode?.id ?? "",
          is_anon: isAnon,
        },
        editMode?.qna.channel?.id ?? ""
      );
      onCancel && onCancel();
    }
  };

  const onEnter = async (event: {
    key: string;
    shiftKey: boolean;
    preventDefault: () => void;
  }) => {
    if (!editMode) {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !createPostLoading &&
        serialize(value).length > 0
      ) {
        event.preventDefault();
        sendPost({
          text: JSON.stringify(value),
          sender_id: member.oid,
          is_anon: isAnon,
        });
        editor.selection = {
          anchor: { path: [0, 0], offset: 0 },
          focus: { path: [0, 0], offset: 0 },
        };
        setValue(initialValue);
        return;
      }
    } else {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !updateLoading &&
        serialize(value).length > 0
      ) {
        event.preventDefault();
        updatingPost(
          {
            text: JSON.stringify(value),
            id: editMode?.id ?? "",
            is_anon: isAnon,
          },
          editMode?.qna.channel?.id ?? ""
        );
        onCancel && onCancel();
        return;
      }
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
            maxHeight: "500px",
            overflowY: height > 500 ? "scroll" : "unset",
          }}
        >
          <div className="w-full max-w-full pt-2" ref={ref}>
            <Editable
              renderLeaf={renderLeaf}
              placeholder="Tulis pertanyaanmu..."
              renderElement={renderElement}
              onKeyDown={onEnter}
              spellCheck
              autoFocus
            />
          </div>
        </div>
        <div className="w-full py-2 flex justify-between">
          <div id="toolbar" className="flex items-center">
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
            {editMode && (
              <Button smaller onClick={onCancel}>
                Batal
              </Button>
            )}
            {editMode && (
              <Button smaller variant="primary" onClick={onUpdate}>
                Ubah
              </Button>
            )}
            {!editMode && (
              <Button variant="primary" onClick={onSend} smaller>
                Kirim
              </Button>
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
          className="p-10 rounded-sm z-100 absolute bottom-2 right-10"
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

export default QnAEditor;

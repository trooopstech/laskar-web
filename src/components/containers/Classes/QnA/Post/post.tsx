import React, { useCallback, useEffect, useMemo, useState } from "react";
import usePost from "context/QnA/Post";
import { getInitials } from "utils/getInitial";
import { Leaf } from "components/modules/Editor/Common/toolbar";
import moment from "moment";
import { BiComment } from "react-icons/bi";
import { Descendant, createEditor } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import { Element } from "components/modules/Editor/Common/element";
import useStyle from "context/styleContext";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const PostSection = () => {
  const { post } = usePost();
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);
  const { isSidebarOpen } = useStyle();

  useEffect(() => {
    if (post?.id) {
      setValue(post.text);
    }
  }, [post]);

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div
      className="flex items-start py-4 px-2 border-b border-gray-600 cursor-pointer"
      style={{
        minWidth: isSidebarOpen ? "80vw" : "",
      }}
    >
      <div
        className="h-full flex items-center justify-center"
        style={{ maxHeight: "64px" }}
      >
        <div
          className="avatar h-14 w-14 rounded-full mr-2 flex items-center justify-center"
          style={{
            backgroundColor: post?.is_anon
              ? "pink"
              : post?.sender?.member.color,
          }}
        >
          <p className="text-xl uppercase font-bold text-center text-white">
            {post?.is_anon
              ? "?"
              : getInitials(post?.sender.member.name as string)}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex items-center">
          <p className={`text-bold`}>
            {post?.is_anon ? "Anonim" : post?.sender.member.name}
          </p>
        </div>
        <div className="w-full flex">
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
        <div className="w-full border-b border-gray-600">
          <p className="text-xs text-gray-500 my-2">
            {post && moment(new Date(post.created_at)).format("ll hh:mm A")}
          </p>
        </div>
        <div className="my-2 flex items-center">
          <span className="text-sm font-light mr-1 text-gray-600">
            {post?.comment.length}
          </span>
          <BiComment />
        </div>
      </div>
    </div>
  );
};

export default PostSection;

import { Leaf } from "components/modules/Editor/Common/toolbar";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Descendant, createEditor } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import { Element } from "components/modules/Editor/Common/element";
import { Post } from "types/post";
import { getInitials } from "utils/getInitial";
import { BiComment } from "react-icons/bi";

import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import useMyPost from "context/QnA/MyPost";
import { MdDelete, MdEdit, MdMoreHoriz } from "react-icons/md";
import { Menu, MenuItem, MenuDivider } from "@szhsin/react-menu";
import QnAEditor from "components/modules/Editor/QnA";
import useStyle from "context/styleContext";

interface PostBubbleProps {
  post: Post;
}

const PostBubble: React.FC<PostBubbleProps> = React.memo(({ post }) => {
  const [value, setValue] = useState<Descendant[]>(post.text);
  const editor = useMemo(() => withReact(createEditor()), []);
  const [onEdit, setOnEdit] = useState(false);
  const history = useHistory();
  const { url } = useRouteMatch();
  const { removePost } = useMyPost();

  useEffect(() => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
  }, []);

  useEffect(() => {
    setValue(post.text);
  }, [post.text]);

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div
      className={`flex m-2 items-start px-2 py-4 rounded-md ${
        onEdit ? "" : "hover:bg-gray-600 cursor-pointer"
      }`}
    >
      <div className="w-13">
        <div
          className="avatar h-12 w-12 rounded-full mr-2 flex items-center justify-center"
          style={{
            backgroundColor: post.is_anon ? "pink" : post?.sender?.member.color,
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
        <div className="flex w-full">
          <Link
            className="flex items-center w-full"
            to={`${url.replace(
              "post",
              `qna/${post.qna.channel?.id}/${post.id}`
            )}`}
          >
            <p className={`text-bold`}>
              {post.is_anon ? "Anonim" : post?.sender.member.name}
            </p>
            <p className="text-xs text-gray-500 ml-4 w-full">
              {moment(new Date(post?.created_at)).format("ll hh:mm A")}
            </p>
          </Link>
          {!onEdit && (
            <div className="flex items-center justify-end">
              <Menu
                menuButton={
                  <button>
                    <MdMoreHoriz />
                  </button>
                }
                menuClassName="bg-gray-700 p-2 rounded-md"
              >
                <MenuItem
                  className={({ hover, active }) =>
                    active
                      ? "bg-gray-700 text-white p-2"
                      : hover
                      ? "bg-gray-600 text-white rounded-md p-2"
                      : "bg-gray-700 text-white p-2"
                  }
                  onClick={() => setOnEdit(true)}
                >
                  <div className="flex items-center">
                    <MdEdit className="mr-2" />
                    Edit
                  </div>
                </MenuItem>
                <MenuDivider className="bg-gray-700" />
                <MenuItem
                  className={({ hover, active }) =>
                    active
                      ? "bg-gray-700 text-white p-2"
                      : hover
                      ? "bg-gray-600 text-white rounded-md p-2"
                      : "bg-gray-700 text-white p-2"
                  }
                  onClick={() =>
                    removePost(post.id ?? "", post.qna.channel?.id ?? "")
                  }
                >
                  <div className="flex items-center">
                    <MdDelete className="mr-2" />
                    Hapus
                  </div>
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
        {onEdit ? (
          <div className="w-full flex">
            <QnAEditor
              defaultValue={value}
              editMode={post}
              onCancel={() => setOnEdit(false)}
            />
          </div>
        ) : (
          <Link
            to={`${url.replace(
              "post",
              `qna/${post.qna.channel?.id}/${post.id}`
            )}`}
          >
            <div className="w-full flex">
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
            <div className="flex items-center">
              <div
                className="flex items-center"
                onClick={() =>
                  history.push(
                    `${url.replace(
                      "post",
                      `qna/${post.qna.channel?.id}/${post.id}`
                    )}`
                  )
                }
              >
                <span className="text-sm font-light mr-1">
                  {post.comment.length}
                </span>
                <BiComment />
              </div>
            </div>
            {post.approved_by.length > 0 && (
              <div className="flex items-center">
                <FaCheck className="text-green-500 text-small font-bold mr-1" />
                <h1 className="text-green-500 text-small font-thin">
                  Jawaban disetujui{" "}
                  {post.approved_by
                    .map((a) => `${a.approver.member.name}`)
                    .join(",")}
                </h1>
              </div>
            )}
          </Link>
        )}
      </div>
    </div>
  );
});

const MyPostBody = () => {
  const { post } = useMyPost();
  const { isSidebarOpen } = useStyle();

  return (
    <div
      className="h-full p-2 w-full overflow-y-auto"
      style={{
        minWidth: isSidebarOpen ? "80vw" : "",
      }}
    >
      {post?.length === 0 && (
        <div className="w-full rounded-md bg-gray-900 py-16 flex items-center justify-center flex-col px-4 sm:px-0">
          <h1 className="font-bold text-2xl text-center">
            Edit dan Hapus Pertanyaan
          </h1>
          <p className="font-thin text-center">
            Saat kamu membuat pertanyaan, kamu akan melihatnya disini.{" "}
          </p>
        </div>
      )}
      {post?.map((p: Post) => (
        <PostBubble post={p} key={p.id} />
      ))}
    </div>
  );
};

export default MyPostBody;

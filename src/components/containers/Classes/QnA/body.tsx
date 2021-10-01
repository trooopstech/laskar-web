import { Leaf } from "components/modules/Editor/Common/toolbar";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Descendant, createEditor } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import { Element } from "components/modules/Editor/Common/element";
import useQnA from "context/QnA";
import { Post } from "types/post";
import { getInitials } from "utils/getInitial";
import { BiComment, BiUpArrowAlt } from "react-icons/bi";

import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import useClassDetail from "hooks/useDetailClass";
import { FaCheck } from "react-icons/fa";

interface PostBubbleProps {
  post: Post;
}

const PostBubble: React.FC<PostBubbleProps> = React.memo(({ post }) => {
  const [value, setValue] = useState<Descendant[]>(post.text);
  const editor = useMemo(() => withReact(createEditor()), []);
  const history = useHistory();
  const { url } = useRouteMatch();
  const { votePost, voteLoading } = useQnA();
  const { getUserClassMember } = useClassDetail();
  const member = getUserClassMember();

  useEffect(() => {
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
  }, []);

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className="flex m-2 items-start px-2 py-4 rounded-md hover:bg-gray-600 cursor-pointer">
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
        <Link className="flex items-center" to={`${url}/${post.id}`}>
          <p className={`text-bold`}>
            {post.is_anon ? "Anonim" : post?.sender.member.name}
          </p>
          <p className="text-xs text-gray-500 ml-4">
            {moment(new Date(post?.created_at)).format("ll hh:mm A")}
          </p>
        </Link>
        <div className="w-full flex">
          <Link className="w-4/5" to={`${url}/${post.id}`}>
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
          </Link>
          <div className="w-1/5 h-full flex items-center justify-end">
            <div
              className="mx-2 flex items-center"
              onClick={() => history.push(`${url}/${post.id}`)}
            >
              <span className="text-sm font-light mr-1">
                {post.comment.length}
              </span>
              <BiComment />
            </div>
            <div
              className="mx-2 flex items-center"
              onClick={() =>
                votePost({ voter_id: member.oid, post_id: post.id as string })
              }
            >
              <span className="text-sm font-light mr-1">
                {post.voter.length}
              </span>
              <BiUpArrowAlt className="text-xl" />
            </div>
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
      </div>
    </div>
  );
});

const QnABody = () => {
  const { qna } = useQnA();

  return (
    <div className="h-full p-2 w-full overflow-y-auto">
      {qna?.post.map((post: Post) => (
        <PostBubble post={post} key={post.id} />
      ))}
    </div>
  );
};

export default QnABody;

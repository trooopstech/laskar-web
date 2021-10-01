import { Leaf } from "components/modules/Editor/Common/toolbar";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Descendant, createEditor } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import { Element } from "components/modules/Editor/Common/element";
import { getInitials } from "utils/getInitial";
import { Comment } from "types/comment";
import usePost from "context/QnA/Post";
import { BsStar, BsStarFill } from "react-icons/bs";
import useClassDetail from "hooks/useDetailClass";
import { FaCheck } from "react-icons/fa";

interface CommentBubbleProps {
  comment: Comment;
}

const CommentBubble: React.FC<CommentBubbleProps> = React.memo(
  ({ comment }) => {
    const [value, setValue] = useState<Descendant[]>(comment.text);
    const editor = useMemo(() => withReact(createEditor()), []);
    const [fillStar, setFillStar] = useState(comment.approved_by.length > 0);
    const { isRoleEqualParam, getUserClassMember } = useClassDetail();
    const { sendApprove, commentIsApprovedByMe, sendUnapprove } = usePost();
    const member = getUserClassMember();
    const isTeacher = isRoleEqualParam("teacher");
    const isAssistant = isRoleEqualParam("assistant");
    const commentIsApprovedByOwn = commentIsApprovedByMe(comment, member);

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

    const approveOrUnapprove = () => {
      if (!fillStar) {
        setFillStar(true);
        return sendApprove;
      }
      setFillStar(false);
      return sendUnapprove;
    };

    return (
      <div className="flex m-2 items-start px-2 py-4 rounded-md hover:bg-gray-600 cursor-pointer">
        <div className="w-13">
          <div
            className="avatar h-12 w-12 rounded-full mr-2 flex items-center justify-center"
            style={{
              backgroundColor: comment.is_anon
                ? "pink"
                : comment?.sender?.member.color,
            }}
          >
            <p className="text-xl uppercase font-bold text-center text-white">
              {comment?.is_anon
                ? "?"
                : getInitials(comment?.sender.member.name as string)}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex items-center">
            <p className={`text-bold`}>
              {comment.is_anon ? "Anonim" : comment?.sender.member.name}
            </p>
            <p className="text-xs text-gray-500 ml-4">
              {moment(new Date(comment?.created_at)).format("ll hh:mm A")}
            </p>
          </div>
          <div className="w-full flex">
            <div className="w-4/5">
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
            {(isAssistant || isTeacher) && (
              <div
                className="w-1/5 h-full flex items-center justify-end"
                onClick={() =>
                  approveOrUnapprove()({
                    comment_id: comment.id as string,
                    approver_id: member.oid,
                  })
                }
              >
                {fillStar || commentIsApprovedByOwn ? (
                  <BsStarFill className="text-yellow-500" />
                ) : (
                  <BsStar />
                )}
              </div>
            )}
          </div>
          {!commentIsApprovedByOwn && comment.approved_by.length > 0 && (
            <div className="flex items-center">
              <FaCheck className="text-green-500 text-small font-bold mr-1" />
              <h1 className="text-green-500 text-small font-thin">
                Disetujui{" "}
                {comment.approved_by
                  .map((a) => `${a.approver.member.name}`)
                  .join(",")}
              </h1>
            </div>
          )}
        </div>
      </div>
    );
  }
);

const PostBody = () => {
  const { post } = usePost();

  return (
    <div className="h-full p-2 w-full overflow-y-auto">
      {post?.comment.map((comment: Comment) => (
        <CommentBubble comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default PostBody;

import CommentEditor from "components/modules/Editor/QnA/comment";
import useStyle from "context/styleContext";
import useClassDetail from "hooks/useDetailClass";
import { getInitials } from "utils/getInitial";

const CommentInput = () => {
  const { getUserClassMember } = useClassDetail();
  const { isSidebarOpen } = useStyle();

  const member = getUserClassMember();

  return (
    <div
      className="px-2 pt-2 w-full flex items-start justify-center relative border-b border-gray-600"
      style={{
        minWidth: isSidebarOpen ? "80vw" : "",
      }}
    >
      <div
        className="h-full flex items-center justify-center"
        style={{ maxHeight: "64px" }}
      >
        <div
          className="avatar h-12 w-12 rounded-full mr-2 flex items-center justify-center"
          style={{ backgroundColor: member?.member?.color }}
        >
          <p className="text-xl uppercase font-bold text-center text-white">
            {getInitials(member?.member?.name as string)}
          </p>
        </div>
      </div>
      <div className="w-full flex pb-4">
        <CommentEditor />
      </div>
    </div>
  );
};

export default CommentInput;

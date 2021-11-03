import { PostProvider } from "context/QnA/Post";
import useStyle from "context/styleContext";
import { useParams } from "react-router";
import PostBody from "./body";
import PostHeader from "./header";
import CommentInput from "./input";
import PostSection from "./post";

const PostContainer = () => {
  // @ts-ignore
  const { postId, channelId } = useParams();
  const { isSidebarOpen } = useStyle();

  return (
    <PostProvider id={postId} channelId={channelId}>
      <div
        className={`${
          isSidebarOpen ? "w-16" : "w-full"
        } h-full relative overflow-hidden flex flex-col`}
        key={postId}
        style={{ overflowX: "hidden" }}
      >
        <PostHeader />
        <div className="overflow-y-auto overflow-x-hidden">
          <PostSection />
          <CommentInput />
          <PostBody />
        </div>
      </div>
    </PostProvider>
  );
};

export default PostContainer;

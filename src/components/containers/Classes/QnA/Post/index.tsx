import { PostProvider } from "context/QnA/Post";
import { useParams } from "react-router";
import PostBody from "./body";
import PostHeader from "./header";
import CommentInput from "./input";
import PostSection from "./post";

const PostContainer = () => {
  // @ts-ignore
  const { postId, channelId } = useParams();

  return (
    <PostProvider id={postId} channelId={channelId}>
      <div
        className="w-full h-full relative overflow-hidden flex flex-col"
        key={postId}
      >
        <PostHeader />
        <div className="overflow-y-auto">
          <PostSection />
          <CommentInput />
          <PostBody />
        </div>
      </div>
    </PostProvider>
  );
};

export default PostContainer;

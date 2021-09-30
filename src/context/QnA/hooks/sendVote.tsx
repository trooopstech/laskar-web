import { useMutation } from "@apollo/client";
import { UPVOTE_POST } from "schema/channels/qna";

const useUpvotePost = () => {
  const [sendUpvote, { loading, error }] = useMutation(UPVOTE_POST);

  return {
    sendUpvote,
    voteLoading: loading,
    voteError: error,
  };
};

export default useUpvotePost;

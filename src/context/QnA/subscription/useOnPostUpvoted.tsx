import { useSubscription } from "@apollo/client";
import { ON_UPVOTE } from "schema/channels/qna";

const useOnPostUpvoted = (channelId: string) => {
  const { data, loading, error } = useSubscription(ON_UPVOTE, {
    variables: { channelId },
  });

  return {
    newPostUpvoted: data,
    postLoading: loading,
    postError: error,
  };
};

export default useOnPostUpvoted;

import { useSubscription } from "@apollo/client";
import { ON_POST_COMMENTED } from "schema/channels/qna";

const useOnPostCommented = (channelId: string) => {
  const { data, loading, error } = useSubscription(ON_POST_COMMENTED, {
    variables: { channelId },
  });

  return {
    newComment: data,
    commentLoading: loading,
    commentError: error,
  };
};

export default useOnPostCommented;

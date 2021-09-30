import { useSubscription } from "@apollo/client";
import { ON_NEW_POST } from "schema/channels/qna";

const useOnNewPost = (channelId: string) => {
  const { data, loading, error } = useSubscription(ON_NEW_POST, {
    variables: { channelId },
  });

  return {
    newPost: data,
    postLoading: loading,
    postError: error,
  };
};

export default useOnNewPost;

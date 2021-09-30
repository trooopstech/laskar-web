import { useMutation } from "@apollo/client";
import { CREATE_POST } from "schema/channels/qna";

const useSendPost = () => {
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  return {
    createPost,
    createPostLoading: loading,
    createPostError: error,
  };
};

export default useSendPost;

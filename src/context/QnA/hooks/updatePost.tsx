import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "schema/channels/qna";

const useUpdatePost = () => {
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST);

  return {
    updatePost,
    updateLoading: loading,
    updateError: error,
  };
};

export default useUpdatePost;

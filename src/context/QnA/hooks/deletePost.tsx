import { useMutation } from "@apollo/client";
import { DELETE_POST } from "schema/channels/qna";

const useDeletePost = () => {
  const [deletePost, { loading, error }] = useMutation(DELETE_POST);

  return {
    deletePost,
    deleteLoading: loading,
    deleteError: error,
  };
};

export default useDeletePost;

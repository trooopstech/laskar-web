import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "schema/channels/qna";

const useSendComment = () => {
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    errorPolicy: "all",
  });

  return {
    createComment,
    createCommentLoading: loading,
    createCommentError: error,
  };
};

export default useSendComment;

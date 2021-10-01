import { useMutation } from "@apollo/client";
import { APPROVE_COMMENT } from "schema/channels/qna";

const useSendApprove = () => {
  const [approveComment, { loading, error }] = useMutation(APPROVE_COMMENT);

  return {
    approveComment,
    approveLoading: loading,
    approveError: error,
  };
};

export default useSendApprove;

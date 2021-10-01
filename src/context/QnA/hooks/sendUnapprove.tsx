import { useMutation } from "@apollo/client";
import { UNAPPROVE_COMMENT } from "schema/channels/qna";

const useSendUnapprove = () => {
  const [unapproveComment, { loading, error }] = useMutation(UNAPPROVE_COMMENT);

  return {
    unapproveComment,
    unapproveLoading: loading,
    unapproveError: error,
  };
};

export default useSendUnapprove;

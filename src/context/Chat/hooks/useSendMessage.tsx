import { useMutation } from "@apollo/client";
import { CREATE_GROUP_MESSAGE } from "schema/channels/chat";

const useSendMessage = () => {
  const [createMessages, { loading, error }] =
    useMutation(CREATE_GROUP_MESSAGE);

  return {
    createMessages,
    createMessagesLoading: loading,
    createMessagesError: error,
  };
};

export default useSendMessage;

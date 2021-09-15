import { useSubscription } from "@apollo/client";
import { ON_NEW_MESSAGES } from "schema/channels/chat";

const useOnNewMessage = (channelId: string) => {
  const { data, loading, error } = useSubscription(ON_NEW_MESSAGES, {
    variables: { channelId },
  });

  return {
    message: data,
    messageLoding: loading,
    messageError: error,
  };
};

export default useOnNewMessage;

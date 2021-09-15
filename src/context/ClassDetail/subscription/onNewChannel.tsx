import { useSubscription } from "@apollo/client";
import { ON_NEW_CHANNEL_CREATED } from "schema/channels";

const useOnNewChannel = (classId: string) => {
  const { data, loading, error } = useSubscription(ON_NEW_CHANNEL_CREATED, {
    variables: { classId },
  });

  return {
    channel: data,
    channelLoading: loading,
    errorLoading: error,
  };
};

export default useOnNewChannel;

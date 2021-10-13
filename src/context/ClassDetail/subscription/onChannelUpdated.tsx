import { useSubscription } from "@apollo/client";
import { ON_CHANNEL_UPDATED } from "schema/channels";

const useOnChannelUpdated = (classId: string) => {
  const { data, loading, error } = useSubscription(ON_CHANNEL_UPDATED, {
    variables: { classId },
  });

  return {
    channelUpdated: data,
    channelLoading: loading,
    errorLoading: error,
  };
};

export default useOnChannelUpdated;

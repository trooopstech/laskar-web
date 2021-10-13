import { useSubscription } from "@apollo/client";
import { ON_CHANNEL_DELETED } from "schema/channels";

const useOnChannelDeleted = (classId: string) => {
  const { data, loading, error } = useSubscription(ON_CHANNEL_DELETED, {
    variables: { classId },
  });

  return {
    channelDeleted: data,
    channelLoading: loading,
    errorLoading: error,
  };
};

export default useOnChannelDeleted;

import { useMutation } from "@apollo/client";
import { CREATE_CHANNEL } from "schema/channels";

const useCreateChannel = () => {
  const [createChannel, { data, loading, error }] = useMutation(
    CREATE_CHANNEL,
    {
      errorPolicy: "all",
    }
  );

  return {
    createChannelAction: createChannel,
    createChannelData: data,
    createChannelLoading: loading,
    createChannelError: error,
  };
};

export default useCreateChannel;

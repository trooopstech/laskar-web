import { useSubscription } from "@apollo/client";
import { ON_ROLE_CHANGED } from "schema/channels/role";

const useOnChangedRole = (classId: string) => {
  const { data, loading, error } = useSubscription(ON_ROLE_CHANGED, {
    variables: { classId },
  });

  return {
    memberWithNewRole: data,
    roleLoading: loading,
    errorRole: error,
  };
};

export default useOnChangedRole;

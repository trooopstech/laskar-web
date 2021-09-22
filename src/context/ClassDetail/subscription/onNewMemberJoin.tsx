import { useSubscription } from "@apollo/client";
import { ON_NEW_MEMBER_JOIN } from "schema/classes";

const useOnNewMember = (classId: string) => {
  const { data, loading, error } = useSubscription(ON_NEW_MEMBER_JOIN, {
    variables: { classId },
  });

  return {
    member: data,
    memberLoading: loading,
    errorMember: error,
  };
};

export default useOnNewMember;

import { useSubscription } from "@apollo/client";
import { ON_LEAVE_CLASS } from "schema/classes";

const useMemberLeaveClass = (classId: string) => {
  const { data, loading, error } = useSubscription(ON_LEAVE_CLASS, {
    variables: { classId },
  });

  return {
    memberLeave: data,
    leaveoading: loading,
    errorLeave: error,
  };
};

export default useMemberLeaveClass;

import { useSubscription } from "@apollo/client";
import { ON_CATEGORY_DELETED } from "schema/channels";

const useOnCategoryDeleted = (classId: string) => {
  const { data, loading, error } = useSubscription(ON_CATEGORY_DELETED, {
    variables: { classId },
  });

  return {
    categoryDeleted: data,
    categoryLoding: loading,
    errorLoading: error,
  };
};

export default useOnCategoryDeleted;

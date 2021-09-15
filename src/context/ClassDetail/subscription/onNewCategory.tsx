import { useSubscription } from "@apollo/client";
import { ON_NEW_CATEGORY_CREATED } from "schema/channels";

const useOnNewCategory = (classId: string) => {
  const { data, loading, error } = useSubscription(ON_NEW_CATEGORY_CREATED, {
    variables: { classId },
  });

  return {
    category: data,
    categoryLoding: loading,
    errorLoading: error,
  };
};

export default useOnNewCategory;

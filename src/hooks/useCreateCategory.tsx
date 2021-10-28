import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "schema/channels";

const useCreateCategory = () => {
  const [createCategory, { data, loading, error }] = useMutation(
    CREATE_CATEGORY,
    {
      errorPolicy: "all",
    }
  );

  return {
    createCategoryAction: createCategory,
    createCategoryData: data,
    createCategoryLoading: loading,
    createCategoryError: error,
  };
};

export default useCreateCategory;

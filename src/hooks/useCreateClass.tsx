import { useMutation } from "@apollo/client";
import { CREATE_CLASS } from "schema/classes";

const useCreateClass = () => {
  const [createClass, { data, loading, error }] = useMutation(CREATE_CLASS, {
    errorPolicy: "all",
  });

  return {
    createClassAction: createClass,
    createClassData: data,
    createClassLoading: loading,
    createClassError: error,
  };
};

export default useCreateClass;

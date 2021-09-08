import { useMutation } from "@apollo/client";
import { CREATE_CLASS } from "schema/classes";

const useCreateClass = () => {
  const [createClass, { data, loading, error }] = useMutation(CREATE_CLASS);

  return {
    createClassAction: createClass,
    createClassData: data,
    createClassLoading: loading,
    createClassError: error,
  };
};

export default useCreateClass;

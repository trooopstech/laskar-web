import { useMutation } from "@apollo/client";
import { REGISTER } from "schema/identities";

const useRegister = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER, {
    errorPolicy: "all",
  });

  return {
    registerAction: register,
    registerData: data,
    registerLoading: loading,
    registerError: error,
  };
};

export default useRegister;

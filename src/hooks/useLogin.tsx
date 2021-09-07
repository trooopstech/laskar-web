import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "schema/identities";

const useLogin = () => {
  const [login, { data, loading, error }] = useLazyQuery(LOGIN);

  return {
    loginAction: login,
    loginData: data,
    loginLoading: loading,
    loginError: error,
  };
};

export default useLogin;

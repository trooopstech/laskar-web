import { useMutation } from "@apollo/client";
import { GOOGLE_LOGIN } from "schema/identities";

const useGoogleLogin = () => {
  const [login, { data, loading, error }] = useMutation(GOOGLE_LOGIN);

  return {
    googleLoginAction: login,
    googleLoginData: data,
    googleLoginLoading: loading,
    googleLoginError: error,
  };
};

export default useGoogleLogin;

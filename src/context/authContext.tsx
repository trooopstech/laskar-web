import { useMutation } from "@apollo/client";
import useGoogleLogin from "hooks/useGoogleLogin";
import useLogin from "hooks/useLogin";
import useRegister from "hooks/useRegister";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UPDATE_USER } from "schema/identities";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: string;
  login: (data: UserLoginInput, cb: () => void) => void;
  register: (data: UserCreateInput, cb: () => void) => void;
  googleLogin: (token: string, cb: () => void) => void;
  updateUser: (data: UserUpdateInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const { loginAction, loginData, loginLoading, loginError } = useLogin();
  const { registerAction, registerData, registerLoading, registerError } =
    useRegister();
  const [updateUserData] = useMutation(UPDATE_USER);
  const {
    googleLoginAction,
    googleLoginData,
    googleLoginError,
    googleLoginLoading,
  } = useGoogleLogin();
  const history = useHistory();
  const location = useLocation();

  const decideData = (
    data1: UserWithJWT,
    data2: UserWithJWT,
    data3: UserWithJWT
  ) => {
    if (data1) {
      return data1;
    }
    if (data2) {
      return data2;
    }
    if (data3) {
      return data3;
    }

    return undefined;
  };

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const rawUser = window.localStorage.getItem("user");
    if (token && rawUser) {
      setUser(JSON.parse(rawUser));
    } else {
      if (location.pathname.includes("dashboard")) {
        history.push("/");
      }
    }
    setLoadingInitial(false);
  }, []);

  useEffect(() => {
    const data = decideData(
      loginData?.login,
      registerData?.register,
      googleLoginData?.googleLogin
    ) as UserWithJWT;
    if (data) {
      if (data.user === null) {
        setError(data.error.message);
      } else {
        console.log(data);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      }
    }
  }, [loginData, registerData, googleLoginData]);

  useEffect(() => {
    setLoading(loginLoading);
  }, [loginLoading]);

  useEffect(() => {
    setError(loginError?.message);
  }, [loginError]);

  useEffect(() => {
    setLoading(googleLoginLoading);
  }, [googleLoginLoading]);

  useEffect(() => {
    setError(googleLoginError?.message);
  }, [googleLoginError]);

  useEffect(() => {
    setLoading(registerLoading);
  }, [registerLoading]);

  useEffect(() => {
    setError(registerError?.message);
  }, [registerError]);

  function login(data: UserLoginInput, cb: () => void): void {
    setError(null);
    loginAction({ variables: { data } });
    cb();
  }

  function googleLogin(token: string, cb: () => void): void {
    setError(null);
    googleLoginAction({ variables: { token } });
    cb();
  }

  function register(data: UserCreateInput, cb: () => void) {
    registerAction({ variables: { data } });
    cb();
  }

  function logout() {
    window.localStorage.clear();
    setUser(undefined);
    history.push("/");
  }

  const updateUser = async (data: UserUpdateInput): Promise<void> => {
    const res = await updateUserData({ variables: { data } });
    setUser(res.data.updateUser);
    window.localStorage.setItem("user", JSON.stringify(res.data.updateUser));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      googleLogin,
      updateUser,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

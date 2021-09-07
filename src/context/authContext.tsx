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

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (data: UserLoginInput, cb: () => void) => void;
  register: (data: UserCreateInput, cb: () => void) => void;
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

  const history = useHistory();
  const location = useLocation();

  const decideData = (data1: UserWithJWT, data2: UserWithJWT) => {
    if (data1) {
      return data1;
    }
    if (data2) {
      return data2;
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
      history.push("/");
    }
    setLoadingInitial(false);
  }, []);

  useEffect(() => {
    const data = decideData(
      loginData?.login,
      registerData?.register
    ) as UserWithJWT;
    if (data) {
      if (data.user === null) {
        setError(data.error);
      } else {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      }
    }
  }, [loginData, registerData]);

  useEffect(() => {
    setLoading(loginLoading);
  }, [loginLoading]);

  useEffect(() => {
    setError(loginError);
  }, [loginError]);

  useEffect(() => {
    setLoading(registerLoading);
  }, [registerLoading]);

  useEffect(() => {
    setError(registerError);
  }, [registerError]);

  function login(data: UserLoginInput, cb: () => void): void {
    loginAction({ variables: { data } });
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

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
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

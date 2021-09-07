/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import useAuth from "hooks/useAuth";
import { ReactNode } from "react";
import { useHistory } from "react-router-dom";

const withAnon = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes & { children?: ReactNode }) => {
    const history = useHistory();
    const { user } = useAuth();
    // checks whether we are on client / browser or server.

    if (user) {
      history.replace("/dashboard");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAnon;

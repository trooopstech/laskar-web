import { AuthProvider } from "context/authContext";
import { Switch } from "react-router-dom";
import routes from "./routes";

const AppRoute = () => {
  return (
    <AuthProvider>
      <Switch>{routes.map((route: JSX.Element) => route)}</Switch>
    </AuthProvider>
  );
};

export default AppRoute;

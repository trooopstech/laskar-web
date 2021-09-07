import useAuth from "hooks/useAuth";
import { Redirect, Route } from "react-router-dom";
import LandingPage from ".";
import DashboardPage from "./dashboard";

interface RouteProps {
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<RouteProps> = ({ children, path, exact }) => {
  let { user } = useAuth();
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

// route configuration
const routes: JSX.Element[] = [
  <Route exact path="/" component={LandingPage} />,
  <PrivateRoute exact path="/dashboard">
    <DashboardPage />
  </PrivateRoute>,
];

export default routes;

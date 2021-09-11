import useAuth from "hooks/useAuth";
import { Redirect, Route } from "react-router-dom";
import LandingPage from ".";
import NotFound from "./404";
import DashboardPage from "./dashboard";
import JoinClassPage from "./join-class";

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
  <Route path="/join-class" component={JoinClassPage} />,
  <PrivateRoute path="/dashboard">
    <DashboardPage />
  </PrivateRoute>,
  <Route path="*">
    <NotFound />
  </Route>,
];

export default routes;

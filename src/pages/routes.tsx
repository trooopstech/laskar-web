import { Route } from "react-router-dom";
import LandingPage from ".";

// route configuration
const routes: JSX.Element[] = [
  <Route exact path="/" component={LandingPage} />,
];

export default routes;

import { Switch } from "react-router-dom";
import routes from "./routes";

const AppRoute = () => {
  return <Switch>{routes.map((route: JSX.Element) => route)}</Switch>;
};

export default AppRoute;

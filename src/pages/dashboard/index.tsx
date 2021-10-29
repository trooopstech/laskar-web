import AppLayout from "components/common/appLayout";
import { StyleProvider } from "context/styleContext";
import { Switch, useRouteMatch, Route } from "react-router";
import ClassDetailPage from "./class";
// import HomePage from "./home";
import ListClassPage from "./list.class";

const DashboardPage = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <StyleProvider>
        <AppLayout>
          {/* <Route path={path} exact component={HomePage} /> */}
          <Route path={`${path}/class`} exact component={ListClassPage} />
          <Route path={`${path}/class/:classId`} component={ClassDetailPage} />
        </AppLayout>
      </StyleProvider>
    </Switch>
  );
};

export default DashboardPage;

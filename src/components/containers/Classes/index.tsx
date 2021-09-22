import useClassDetail from "hooks/useDetailClass";
import { useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import ChatContainer from "./Chat";
import NonChannel from "./nonChannel";
import MemberContainer from "./Member";

const ClassDetail = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const { classDetail } = useClassDetail();

  useEffect(() => {
    const visibleCategory = classDetail?.channel_category.filter(
      (category) => !category.hidden
    ) as ChannelCategory[];

    if (visibleCategory.length > 0) {
      if (visibleCategory[0].channels.length > 0) {
        const firstChannel = visibleCategory[0].channels[0].id;
        return history.replace(`${url}/${firstChannel}`);
      }
    }

    return history.replace(url);
  }, [classDetail, history, url]);

  return (
    <Switch>
      <Route exact path={path}>
        <NonChannel />
      </Route>
      <Route exact path={`${path}/member`}>
        <MemberContainer />
      </Route>
      <Route path={`${path}/:channelId`}>
        <ChatContainer />
      </Route>
    </Switch>
  );
};

export default ClassDetail;

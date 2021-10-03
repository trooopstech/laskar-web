import useClassDetail from "hooks/useDetailClass";
import { useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import ChatContainer from "./Chat";
import NonChannel from "./nonChannel";
import MemberContainer from "./Member";
import QnAContainer from "./QnA";
import PostContainer from "./QnA/Post";
import MyPostContainer from "./MyPost";

const ClassDetail = () => {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const { classDetail } = useClassDetail();

  useEffect(() => {
    const visibleCategory = classDetail?.channel_category.filter(
      (category) => !category.hidden
    ) as ChannelCategory[];

    if (!pathname.includes("member")) {
      if (visibleCategory.length > 0) {
        if (visibleCategory[0].channels.length > 0) {
          const firstChannel = visibleCategory[0].channels[0].id;
          return history.replace(`${url}/chat/${firstChannel}`);
        }
      }

      return history.replace(url);
    }
  }, [classDetail, history, url]);

  return (
    <Switch>
      <Route exact path={path}>
        <NonChannel />
      </Route>
      <Route exact path={`${path}/member`}>
        <MemberContainer />
      </Route>
      <Route path={`${path}/chat/:channelId`}>
        <ChatContainer />
      </Route>
      <Route exact path={`${path}/qna/:channelId`}>
        <QnAContainer />
      </Route>
      <Route path={`${path}/qna/:channelId/:postId`}>
        <PostContainer />
      </Route>
      <Route path={`${path}/post`}>
        <MyPostContainer />
      </Route>
    </Switch>
  );
};

export default ClassDetail;

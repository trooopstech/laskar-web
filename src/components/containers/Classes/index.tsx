import { Route, Switch, useRouteMatch } from "react-router";
import ChatContainer from "./Chat";
import NonChannel from "./nonChannel";
import MemberContainer from "./Member";
import QnAContainer from "./QnA";
import PostContainer from "./QnA/Post";
import MyPostContainer from "./MyPost";
import useClassDetail from "hooks/useDetailClass";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const ClassDetail = () => {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState<string>();
  const history = useHistory();
  const { classDetail, getFirstCategory } = useClassDetail();

  useEffect(() => {
    const visibleCategory = getFirstCategory();

    if (prevPath?.includes("member")) {
      setPrevPath(pathname);
      if (visibleCategory.length > 0) {
        if (visibleCategory[0].channels.length > 0) {
          const firstChannel = visibleCategory[0].channels[0].id;
          return history.replace(`${url}/chat/${firstChannel}`);
        }
      }
    } else {
      setPrevPath(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const visibleCategory = getFirstCategory();

    setPrevPath(pathname);

    if (visibleCategory.length > 0) {
      if (visibleCategory[0].channels.length > 0) {
        const firstChannel = visibleCategory[0].channels[0].id;
        return history.replace(`${url}/chat/${firstChannel}`);
      }
    }
    return history.replace(url);
  }, [classDetail]);

  return (
    <Switch>
      <Route exact path={path}>
        <NonChannel />
      </Route>
      <Route exact path={`${path}/member`}>
        <MemberContainer />
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
      <Route exact path={`${path}/chat/:channelId`}>
        <ChatContainer />
      </Route>
    </Switch>
  );
};

export default ClassDetail;

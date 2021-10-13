import { Route, Switch, useRouteMatch } from "react-router";
import ChatContainer from "./Chat";
import NonChannel from "./nonChannel";
import MemberContainer from "./Member";
import QnAContainer from "./QnA";
import PostContainer from "./QnA/Post";
import MyPostContainer from "./MyPost";

const ClassDetail = () => {
  const { path } = useRouteMatch();

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

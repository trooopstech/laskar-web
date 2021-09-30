import useClassDetail from "hooks/useDetailClass";
import { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

const NonChannel = () => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { classDetail } = useClassDetail();

  useEffect(() => {
    const visibleCategory = classDetail?.channel_category.filter(
      (category) => !category.hidden
    ) as ChannelCategory[];

    if (visibleCategory.length > 0) {
      if (visibleCategory[0].channels.length > 0) {
        const firstChannel = visibleCategory[0].channels[0].id;
        return history.replace(`${url}/chat/${firstChannel}`);
      }
    }

    return history.replace(url);
  }, [classDetail, history, url]);
  return (
    <div className="container p-4">
      <h1>Kelas {classDetail?.name}</h1>
    </div>
  );
};

export default NonChannel;

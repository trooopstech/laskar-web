import { MyPostProvider } from "context/QnA/MyPost";
import useClassDetail from "hooks/useDetailClass";
import { useParams } from "react-router";
import MyPostBody from "./body";
import MyPostHeader from "./header";

const MyPostContainer = () => {
  const { getUserClassMember } = useClassDetail();
  const member = getUserClassMember();

  return (
    <MyPostProvider id={member.oid}>
      <div className="w-full h-full relative overflow-hidden flex flex-col border-gray-700 border-l sm:border-l-0">
        <MyPostHeader />
        <MyPostBody />
      </div>
    </MyPostProvider>
  );
};

export default MyPostContainer;

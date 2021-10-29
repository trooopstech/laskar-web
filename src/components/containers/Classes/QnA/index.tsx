import { QnAProvider } from "context/QnA";
import { useParams } from "react-router";
import QnABody from "./body";
import QnAHeader from "./header";
import QnAInput from "./input";

const QnAContainer = () => {
  // @ts-ignore
  const { channelId } = useParams();

  return (
    <QnAProvider id={channelId}>
      <div
        className="w-full h-full relative overflow-hidden flex flex-col border-gray-700 border-l sm:border-l-0"
        key={channelId}
      >
        <QnAHeader />
        <QnAInput />
        <QnABody />
      </div>
    </QnAProvider>
  );
};

export default QnAContainer;

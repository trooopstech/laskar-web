import { useParams } from "react-router-dom";
import AnnouncementSection from "./announcement.section";

const Rightbar = () => {
  // @ts-ignore
  const { classId } = useParams();

  if (classId) {
    return (
      <div
        className="h-full w-2/5 p-2 bg-gray-800 border-r border-gray-700 border-l flex flex-col relative"
        style={{ maxWidth: "360px" }}
      >
        <AnnouncementSection />
      </div>
    );
  }

  return <></>;
};

export default Rightbar;

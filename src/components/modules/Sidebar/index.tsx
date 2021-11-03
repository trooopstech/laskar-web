import useWindowSize from "hooks/useWindowSize";
import { useParams } from "react-router-dom";
import ClassSection from "./class.section";
import HomeSection from "./home.section";

const Sidebar = () => {
  // @ts-ignore
  const { classId } = useParams();
  const { width } = useWindowSize();

  return (
    <div
      className="h-full px-2 bg-gray-900 border-r border-gray-modal border-l flex flex-col relative transition duration-500 ease-in-out"
      style={{ width: width > 640 ? "325px" : "100%" }}
    >
      {classId ? <ClassSection /> : <HomeSection />}
    </div>
  );
};

export default Sidebar;

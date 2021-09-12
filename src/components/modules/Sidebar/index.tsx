import { useParams } from "react-router-dom";
import ClassSection from "./class.section";
import HomeSection from "./home.section";

const Sidebar = () => {
  // @ts-ignore
  const { classId } = useParams();

  return (
    <div className="h-full w-80 px-2 bg-gray-800 border-r border-gray-600 border-l flex flex-col relative">
      {classId ? <ClassSection /> : <HomeSection />}
    </div>
  );
};

export default Sidebar;

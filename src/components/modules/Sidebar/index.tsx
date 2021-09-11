import { useParams } from "react-router-dom";
import ClassSection from "./class.section";
import HomeSection from "./home.section";

const Sidebar = () => {
  // @ts-ignore
  const { classId } = useParams();

  return (
    <div className="h-full w-64 p-4 bg-gray-800 border-r-2 border-gray-600 border-l-2 flex flex-col relative">
      {classId ? <ClassSection /> : <HomeSection />}
    </div>
  );
};

export default Sidebar;

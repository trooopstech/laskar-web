import { useParams } from "react-router-dom";
import ClassSection from "./class.section";
import HomeSection from "./home.section";

const Sidebar = () => {
  // @ts-ignore
  const { classId } = useParams();

  return (
    <div
      className="h-full px-2 bg-gray-800 border-r border-gray-700 border-l flex flex-col relative transition duration-500 ease-in-out"
      style={{ width: "325px" }}
    >
      {classId ? <ClassSection /> : <HomeSection />}
    </div>
  );
};

export default Sidebar;

import Header from "components/modules/Header";
import Menubar from "components/modules/Menubar";
import Rightbar from "components/modules/Rightbar";
import Sidebar from "components/modules/Sidebar";
import { useLocation } from "react-router";

const PageLayout: React.FC = ({ children }) => {
  const { pathname } = useLocation();

  const isOnMemberPage = () => {
    return pathname.includes("member");
  };

  return (
    <div className="flex flex-row w-full">
      <div className="h-full w-full bg-gray-800">
        <Header />
        <div
          className="w-full overflow-y-auto flex"
          style={{ height: "calc(100% - 4rem)" }}
        >
          <Menubar />
          {!isOnMemberPage() && <Sidebar />}
          {children}
          {/* {!isOnMemberPage() && <Rightbar />} */}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

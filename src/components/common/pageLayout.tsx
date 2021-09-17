import Header from "components/modules/Header";
import Menubar from "components/modules/Menubar";
import Rightbar from "components/modules/Rightbar";
import Sidebar from "components/modules/Sidebar";

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-row w-full">
      <div className="h-full w-full bg-gray-800">
        <Header />
        <div
          className="w-full overflow-y-auto flex"
          style={{ height: "calc(100% - 4rem)" }}
        >
          <Menubar />
          <Sidebar />
          {children}
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

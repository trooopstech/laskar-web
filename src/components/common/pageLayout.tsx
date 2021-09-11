import Header from "components/modules/Header";
import Sidebar from "components/modules/Sidebar";

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-row w-full">
      <div className="h-full w-full bg-gray-800">
        <Header />
        <div className="w-full overflow-y-auto flex" style={{ height: "92vh" }}>
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

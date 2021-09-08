import Header from "components/modules/Header";
import Sidebar from "components/modules/Sidebar";

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="h-full w-full bg-gray-gradient">
        <Header />
        <div className="w-full overflow-y-auto" style={{ height: "92vh" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

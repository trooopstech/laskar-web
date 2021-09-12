import Menubar from "components/modules/Menubar";
import { ClassProvider } from "context/classContext";
import React from "react";

const AppLayout: React.FC = ({ children }) => {
  return (
    <ClassProvider>
      <div className="w-screen h-screen flex flex-row text-white no-overflow-x no-overflow-y">
        {children}
      </div>
    </ClassProvider>
  );
};

export default AppLayout;

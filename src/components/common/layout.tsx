import Footer from "components/modules/Footer";
import Navbar from "components/modules/Navbar";
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="w-screen min-h-screen h-screen bg-gray-1000 text-white no-overflow-x">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;

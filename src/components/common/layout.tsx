import Footer from "components/modules/Footer";
import Navbar from "components/modules/Navbar";
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="w-screen pt-16 lg:pt-20 min-h-screen h-screen bg-gray-800 text-white no-overflow-x">
      <Navbar />
      <div className="lg:px-20 px-4 md:px-15 h-full">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

import { Link } from "react-router-dom";
import Navigation from "./navigation";
import ProfileBadge from "./profile";
import TitleSection from "./title";
import logo from "assets/logo_white.png";

const Header = () => {
  return (
    <header className="w-full  px-3 h-16 bg-gray-800 flex justify-between items-center shadow-md border-b border-gray-700">
      <div className="flex items-center w-1/3">
        <Link
          to={"/dashboard"}
          style={{ height: "42px", width: "42px" }}
          className="bg-gray-700 rounded-lg shadow-sm cursor-pointer flex items-center justify-center mr-4"
        >
          <img src={logo} alt="logo" width="75%" />
        </Link>
        <TitleSection />
      </div>
      <Navigation />
      <ProfileBadge />
    </header>
  );
};

export default Header;

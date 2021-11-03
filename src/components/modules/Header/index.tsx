import { Link } from "react-router-dom";
import Navigation from "./navigation";
import ProfileBadge from "./profile";
import TitleSection from "./title";
import logo from "assets/logo_white.png";

const Header = () => {
  return (
    <header className="w-full px-3 h-16 bg-gray-900 flex justify-between items-center shadow-md border-b border-gray-700">
      <div className="flex items-center sm:w-1/2 md:w-1/3">
        <TitleSection />
      </div>
      <Navigation />
      <ProfileBadge />
    </header>
  );
};

export default Header;

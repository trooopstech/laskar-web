import ProfileBadge from "./profile";
import TitleSection from "./title";

const Header = () => {
  return (
    <header className="w-full py-4 px-2 bg-gray-800 flex justify-between items-center shadow-sm border-b-2 border-l-2 border-gray-600">
      <TitleSection />
      <ProfileBadge />
    </header>
  );
};

export default Header;

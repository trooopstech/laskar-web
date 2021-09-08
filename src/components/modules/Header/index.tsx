import useAuth from "hooks/useAuth";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useLocation } from "react-router";
import { headerTitles } from "utils/titleMaker";
import { MdDashboard, MdClass } from "react-icons/md";
import useClassDetail from "hooks/useDetailClass";

const HOMEPAGE_ICON: { [key: string]: JSX.Element } = {
  Kelas: <MdClass style={{ fontSize: "32px" }} />,
  Dashboard: <MdDashboard style={{ fontSize: "32px" }} />,
};

const Header = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const { classDetail } = useClassDetail();

  return (
    <header className="w-full py-4 px-2 bg-gray-800 flex justify-between items-center shadow-sm border-b-2 border-black">
      <div className="flex items-center">
        {classDetail?.name ? "" : HOMEPAGE_ICON[headerTitles(pathname)]}
        <p className="ml-2 text-xl">
          {classDetail?.name ? "" : headerTitles(pathname)}
        </p>
      </div>
      <div>
        <Menu
          menuButton={
            <button className="py-2 px-2 rounded-md bg-red-500 cursor-pointer">
              {/* @ts-ignore */}
              <p className="text-xs uppercase">{user.email.slice(0, 2)}</p>
            </button>
          }
          menuClassName="bg-gray-700 p-2"
        >
          <MenuItem
            className={({ hover, active }) =>
              active
                ? "bg-gray-700 text-white"
                : hover
                ? "bg-gray-600 text-white rounded-sm"
                : "bg-gray-700 text-white"
            }
            onClick={logout}
          >
            Keluar
          </MenuItem>
          <MenuItem
            className={({ hover, active }) =>
              active
                ? "bg-gray-700 text-white"
                : hover
                ? "bg-gray-600 text-white rounded-sm"
                : "bg-gray-700 text-white"
            }
            onClick={logout}
          >
            Profil
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;

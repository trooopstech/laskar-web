import { MdExpandMore } from "react-icons/md";
import { Menu, MenuItem } from "@szhsin/react-menu";
import useAuth from "hooks/useAuth";

const ProfileBadge = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center">
      <Menu
        menuButton={
          <button className="py-2 px-2 rounded-md bg-red-500 cursor-pointer">
            {/* @ts-ignore */}
            <p className="text-xs uppercase">{user.email.slice(0, 2)}</p>
          </button>
        }
        menuClassName="bg-gray-600"
      >
        <MenuItem
          className={({ hover, active }) =>
            active
              ? "bg-gray-600 text-white p-2"
              : hover
              ? "bg-gray-500 text-white rounded-sm p-2"
              : "bg-gray-600 text-white p-2"
          }
          onClick={logout}
        >
          Keluar
        </MenuItem>
        <MenuItem
          className={({ hover, active }) =>
            active
              ? "bg-gray-600 text-white p-2"
              : hover
              ? "bg-gray-500 text-white rounded-sm p-2"
              : "bg-gray-600 text-white p-2"
          }
          onClick={logout}
        >
          Profil
        </MenuItem>
      </Menu>
      <MdExpandMore className="ml-1" />
    </div>
  );
};

export default ProfileBadge;

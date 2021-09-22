import { MdExpandMore } from "react-icons/md";
import { Menu, MenuItem } from "@szhsin/react-menu";
import useAuth from "hooks/useAuth";

const ProfileBadge = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center w-1/3 justify-end">
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
              ? "bg-gray-700 text-white p-2"
              : hover
              ? "bg-gray-600 text-white rounded-md p-2"
              : "bg-gray-700 text-white p-2"
          }
          onClick={logout}
        >
          Keluar
        </MenuItem>
      </Menu>
      <MdExpandMore className="ml-1" />
    </div>
  );
};

export default ProfileBadge;

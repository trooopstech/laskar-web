import useClassDetail from "hooks/useDetailClass";
import { MdMoreVert } from "react-icons/md";
import { Menu, MenuItem } from "@szhsin/react-menu";

const ClassSection = () => {
  const { classDetail } = useClassDetail();
  return (
    <div>
      <header className="w-full p-4 flex justify-between items-center shadow-sm absolute top-0 left-0">
        <h1 className="text-xl text-bold">{classDetail?.name}</h1>
        <div className="flex items-end">
          <Menu
            menuButton={
              <div className="cursor-pointer">
                <MdMoreVert style={{ fontSize: "20px" }} />
              </div>
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
            >
              Anggota
            </MenuItem>
          </Menu>
        </div>
      </header>
    </div>
  );
};

export default ClassSection;

import useClassDetail from "hooks/useDetailClass";
import { MdDashboard, MdClass, MdExpandMore, MdGroupAdd } from "react-icons/md";
import { useLocation } from "react-router";
import { headerTitles } from "utils/titleMaker";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import ClassTokenModal, { useClassTokenModal } from "../Modal/tokenClass.modal";

const HOMEPAGE_ICON: { [key: string]: JSX.Element } = {
  Kelas: <MdClass style={{ fontSize: "32px" }} />,
  Dashboard: <MdDashboard style={{ fontSize: "32px" }} />,
};

const TitleSection = () => {
  const { pathname } = useLocation();
  const { classDetail } = useClassDetail();
  const { isTokenOpen, closeToken, openToken } = useClassTokenModal();

  return (
    <div className="flex items-center">
      {classDetail?.name ? "" : HOMEPAGE_ICON[headerTitles(pathname)]}
      <p className="ml-2 text-xl">
        {classDetail?.name ? classDetail?.name : headerTitles(pathname)}
      </p>
      {classDetail?.name && (
        <Menu
          menuButton={
            <button>
              <MdExpandMore
                className="ml-1 cursor-pointer"
                style={{ fontSize: "24px" }}
              />
            </button>
          }
          menuClassName="bg-gray-600 p-2"
        >
          <MenuItem
            className={({ hover, active }) =>
              active
                ? "bg-gray-600 text-white p-2"
                : hover
                ? "bg-gray-500 text-white rounded-sm p-2"
                : "bg-gray-600 text-white p-2"
            }
            onClick={openToken}
          >
            Undang Member
            <MdGroupAdd className="ml-2" style={{ fontSize: "24px" }} />
          </MenuItem>
          <MenuDivider className="bg-gray-500" />
          <MenuItem
            className={({ hover, active }) =>
              active
                ? "bg-gray-600 text-white p-2"
                : hover
                ? "bg-gray-500 text-white rounded-sm p-2"
                : "bg-gray-600 text-white p-2"
            }
            onClick={() => console.log("wkwk")}
          >
            Tambah Kategori
          </MenuItem>
        </Menu>
      )}
      {isTokenOpen > 0 && (
        <ClassTokenModal open={isTokenOpen} onClose={closeToken} />
      )}
    </div>
  );
};

export default TitleSection;

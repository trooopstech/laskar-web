import useClassDetail from "hooks/useDetailClass";
import { MdDashboard, MdClass, MdExpandMore, MdGroupAdd } from "react-icons/md";
import { useLocation } from "react-router";
import { headerTitles } from "utils/titleMaker";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import ClassTokenModal, { useClassTokenModal } from "../Modal/tokenClass.modal";
import CreateCategoryModal, {
  useCreateCategoryModal,
} from "../Modal/createCategory.modal";

const HOMEPAGE_ICON: { [key: string]: JSX.Element } = {
  Kelas: <MdClass style={{ fontSize: "32px" }} />,
  Dashboard: <MdDashboard style={{ fontSize: "32px" }} />,
};

const TitleSection = () => {
  const { pathname } = useLocation();
  const { classDetail, isAdministrator } = useClassDetail();
  const { isTokenOpen, closeToken, openToken } = useClassTokenModal();
  const { isCategoryOpen, closeCategory, openCategory } =
    useCreateCategoryModal();

  return (
    <div className="flex items-center">
      {classDetail?.name ? "" : HOMEPAGE_ICON[headerTitles(pathname)]}
      <p className="ml-2 text-xl overflow-ellipsis">
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
            onClick={openToken}
          >
            Undang Member
          </MenuItem>
          {isAdministrator() && (
            <>
              <MenuDivider className="bg-gray-700" />
              <MenuItem
                className={({ hover, active }) =>
                  active
                    ? "bg-gray-700 text-white p-2"
                    : hover
                    ? "bg-gray-600 text-white rounded-md p-2"
                    : "bg-gray-700 text-white p-2"
                }
                onClick={openCategory}
              >
                Tambah Kategori
              </MenuItem>
            </>
          )}
        </Menu>
      )}
      {isTokenOpen > 0 && (
        <ClassTokenModal open={isTokenOpen} onClose={closeToken} />
      )}
      <CreateCategoryModal open={isCategoryOpen} onClose={closeCategory} />
    </div>
  );
};

export default TitleSection;

import useClassDetail from "hooks/useDetailClass";
import { MdDashboard, MdClass, MdExpandMore } from "react-icons/md";
import { useLocation } from "react-router";
import { headerTitles } from "utils/titleMaker";
import { Menu, MenuItem } from "@szhsin/react-menu";
import ClassTokenModal, { useClassTokenModal } from "../Modal/TokenClass";
import CreateCategoryModal, {
  useCreateCategoryModal,
} from "../Modal/createCategory.modal";
import useClass from "hooks/useClasses";

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
  const { leavingClass } = useClass();

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
          >
            Pengaturan
          </MenuItem>
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
            Undang Teman
          </MenuItem>
          {isAdministrator() && (
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
          )}
          <MenuItem
            className={({ hover, active }) =>
              active
                ? "bg-gray-700 text-white p-2"
                : hover
                ? "bg-gray-600 text-white rounded-md p-2"
                : "bg-gray-700 text-white p-2"
            }
            onClick={() => leavingClass(classDetail.id)}
          >
            Tinggalkan Kelas
          </MenuItem>
        </Menu>
      )}
      {isTokenOpen > 0 && (
        <ClassTokenModal
          open={isTokenOpen}
          onClose={closeToken}
          keyword="STUDENT"
        />
      )}
      <CreateCategoryModal open={isCategoryOpen} onClose={closeCategory} />
    </div>
  );
};

export default TitleSection;

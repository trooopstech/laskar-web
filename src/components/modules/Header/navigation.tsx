import useClassDetail from "hooks/useDetailClass";
import useWindowSize from "hooks/useWindowSize";
import { MdForum, MdPeople } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const { classDetail } = useClassDetail();
  const { width } = useWindowSize();

  if (!classDetail) {
    return <></>;
  }

  return (
    <div className="sm:w-1/2 md:w-2/3 h-full flex justify-center items-center text-gray-500">
      <NavLink
        className="h-full px-4 mx-2 flex items-center  hover:text-gray-100"
        to={`/dashboard/class/${classDetail?.id}/member`}
        activeClassName="border-b-4 border-gray-100 text-gray-100"
        isActive={(match, location) => {
          if (location?.pathname.includes("member")) {
            return true;
          }
          return false;
        }}
      >
        {width > 640 ? "Anggota" : <MdPeople />}
      </NavLink>
      <NavLink
        className="h-full px-4 flex items-center mx-2  hover:text-gray-100"
        to={`/dashboard/class/${classDetail?.id}`}
        activeClassName="border-b-4 border-gray-100 text-gray-100"
        isActive={(match, location) => {
          if (!location?.pathname.includes("member")) {
            return true;
          }
          return false;
        }}
      >
        {width > 640 ? "Forum" : <MdForum />}
      </NavLink>
    </div>
  );
};

export default Navigation;

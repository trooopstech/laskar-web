import useClassDetail from "hooks/useDetailClass";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const { classDetail } = useClassDetail();

  if (!classDetail) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center text-gray-500">
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
        Anggota
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
        Forum
      </NavLink>
    </div>
  );
};

export default Navigation;

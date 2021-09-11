import { NavLink } from "react-router-dom";
import { MdDashboard, MdClass } from "react-icons/md";

const HomeSection = () => {
  return (
    <>
      <NavLink
        to="/dashboard"
        className="my-2 p-2 rounded-sm"
        isActive={(match, location) => {
          if (location?.pathname === match?.url) {
            return true;
          }
          return false;
        }}
        activeClassName="bg-gray-600"
      >
        <p className="text-xl flex items-center">
          <MdDashboard style={{ fontSize: "32px" }} />
          <div className="ml-2" />
          Dashboard
        </p>
      </NavLink>
      <NavLink
        to="/dashboard/class"
        isActive={(match, location) => {
          if (location?.pathname === match?.url) {
            return true;
          }
          return false;
        }}
        className="my-2 p-2 rounded-sm"
        activeClassName="bg-gray-600"
      >
        <p className="text-xl flex">
          <MdClass style={{ fontSize: "32px" }} />
          <div className="ml-2" />
          Kelas
        </p>
      </NavLink>
    </>
  );
};

export default HomeSection;

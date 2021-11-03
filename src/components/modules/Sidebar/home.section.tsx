import { NavLink } from "react-router-dom";
import { MdDashboard, MdClass } from "react-icons/md";

const HomeSection = () => {
  return (
    <>
      {/* <NavLink
        to="/dashboard"
        className="my-2 p-2 rounded-md"
        isActive={(match, location) => {
          if (location?.pathname === match?.url) {
            return true;
          }
          return false;
        }}
        activeClassName="bg-gray-600"
      >
        <p className="flex items-center">
          <MdDashboard style={{ fontSize: "24px" }} />
          <div className="ml-2" />
          Dashboard
        </p>
      </NavLink> */}
      <NavLink
        to="/dashboard/class"
        isActive={(match, location) => {
          if (location?.pathname === match?.url) {
            return true;
          }
          return false;
        }}
        className="my-2 p-2 rounded-md"
        activeClassName="bg-gray-700"
      >
        <p className="flex">
          <MdClass style={{ fontSize: "24px" }} />
          <div className="ml-2" />
          Kelas
        </p>
      </NavLink>
    </>
  );
};

export default HomeSection;

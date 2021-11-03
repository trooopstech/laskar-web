import Classes from "components/elements/Classes";
import useClass from "hooks/useClasses";
import useWindowSize from "hooks/useWindowSize";
import { MdAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import CreateClassModal, { useCreateClassModal } from "../Modal/CreateClass";
import JoinClassModal, { useJoinClassModal } from "../Modal/JoinClass";
import logo from "assets/logo_white.png";
import { useState } from "react";

const Menubar = () => {
  const { classes } = useClass();
  const { openCreateClass, isCreateClassOpen, closeCreateClass } =
    useCreateClassModal();
  const { openJoinClass, isJoinClassOpen, closeJoinClass } =
    useJoinClassModal();
  const { width } = useWindowSize();
  const [onHome, setOnHome] = useState(false);

  return (
    <div
      className="px-3 py-2 h-full bg-gray-1000 shadow overflow-y-auto"
      style={{ width: width < 640 ? "70px" : "" }}
    >
      <NavLink
        to={"/dashboard/class"}
        style={{ height: "42px", width: "42px" }}
        isActive={(_, location) => {
          if (location.pathname.split("/").length === 3) {
            setOnHome(true);
            return true;
          }
          setOnHome(false);
          return false;
        }}
        className="bg-gray-700 rounded-lg shadow-sm cursor-pointer flex items-center justify-center transform relative"
      >
        {onHome && (
          <div className=" bg-white w-1 h-2/3 absolute -left-2 rounded-r-lg" />
        )}
        <img src={logo} alt="logo" width="80px" />
      </NavLink>
      {classes.map((data) => (
        <Classes
          id={data?.id}
          key={data?.id}
          name={data?.name}
          color={`#${data?.color}`}
        />
      ))}
      <div
        className="bg-gray-700 rounded-lg transition-all hover:bg-gray-600 shadow-sm cursor-pointer flex items-center justify-center mt-2"
        onClick={openCreateClass}
        style={{ height: "42px", width: "42px" }}
      >
        <MdAdd />
      </div>
      <CreateClassModal
        open={isCreateClassOpen}
        onClose={closeCreateClass}
        openOther={openJoinClass}
      />
      <JoinClassModal
        open={isJoinClassOpen}
        onClose={closeJoinClass}
        openOther={openCreateClass}
      />
    </div>
  );
};

export default Menubar;

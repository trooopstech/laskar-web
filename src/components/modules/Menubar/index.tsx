import Classes from "components/elements/Classes";
import useStyle from "context/styleContext";
import useClass from "hooks/useClasses";
import useWindowSize from "hooks/useWindowSize";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import CreateClassModal, { useCreateClassModal } from "../Modal/CreateClass";
import JoinClassModal, { useJoinClassModal } from "../Modal/JoinClass";
import logo from "assets/logo_white.png";

const Menubar = () => {
  const { classes } = useClass();
  const { openCreateClass, isCreateClassOpen, closeCreateClass } =
    useCreateClassModal();
  const { openJoinClass, isJoinClassOpen, closeJoinClass } =
    useJoinClassModal();
  const { width } = useWindowSize();

  return (
    <div
      className="px-3 py-2 h-full bg-gray-1000 shadow overflow-y-auto"
      style={{ width: width < 640 ? "70px" : "" }}
    >
      <Link
        to={"/dashboard/class"}
        style={{ height: "42px", width: "42px" }}
        className="bg-gray-700 rounded-lg shadow-sm cursor-pointer flex items-center justify-center"
      >
        <img src={logo} alt="logo" width="80px" />
      </Link>
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

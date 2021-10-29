import Classes from "components/elements/Classes";
import useClass from "hooks/useClasses";
import useWindowSize from "hooks/useWindowSize";
import { MdAdd } from "react-icons/md";
import CreateClassModal, { useCreateClassModal } from "../Modal/CreateClass";
import JoinClassModal, { useJoinClassModal } from "../Modal/JoinClass";

const Menubar = () => {
  const { classes } = useClass();
  const { openCreateClass, isCreateClassOpen, closeCreateClass } =
    useCreateClassModal();
  const { openJoinClass, isJoinClassOpen, closeJoinClass } =
    useJoinClassModal();

  return (
    <div
      className="px-3 pb-2 h-full bg-gray-800 shadow overflow-y-auto"
      style={{ width: "80px" }}
    >
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

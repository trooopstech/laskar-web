import Classes from "components/elements/Classes";
import useClass from "hooks/useClasses";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import CreateClassModal, {
  useCreateClassModal,
} from "../Modal/createClass.modal";
import JoinClassModal, { useJoinClassModal } from "../Modal/joinClass.modal";

const Menubar = () => {
  const { classes } = useClass();
  const { openCreateClass, isCreateClassOpen, closeCreateClass } =
    useCreateClassModal();
  const { openJoinClass, isJoinClassOpen, closeJoinClass } =
    useJoinClassModal();

  return (
    <div className="px-3 pb-2 h-full bg-gray-800 shadow">
      {classes.map((data) => (
        <Classes
          id={data?.id}
          key={data?.id}
          name={data?.name}
          color={`#${data?.color}`}
        />
      ))}
      <div
        className="bg-gray-500 rounded-lg transition-all hover:bg-red-400 shadow-sm cursor-pointer flex items-center justify-center mt-2"
        onClick={openCreateClass}
        style={{ height: "42px", width: "42px" }}
      >
        <MdAddCircle />
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

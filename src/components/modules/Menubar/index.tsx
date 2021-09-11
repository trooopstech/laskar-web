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

  console.log(classes);

  return (
    <div className="p-2 h-full bg-gray-800 shadow">
      <Link
        to={"/dashboard"}
        className="w-12 h-12 bg-gray-400 rounded-md shadow-sm cursor-pointer flex items-center justify-center"
      >
        <p className="text-base uppercase font-bold text-center">logo</p>
      </Link>
      {classes.map((data) => (
        <Classes id={data?.id} name={data?.name} color={`#${data?.color}`} />
      ))}
      <div
        className="w-12 h-12 bg-gray-500 rounded-md transition-all hover:bg-red-400 shadow-sm cursor-pointer flex items-center justify-center mt-2"
        onClick={openCreateClass}
      >
        <MdAddCircle style={{ fontSize: "32px" }} />
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

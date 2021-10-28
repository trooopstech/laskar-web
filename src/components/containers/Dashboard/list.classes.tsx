import ClassCard from "components/elements/Classes/class.card";
import CreateClassModal, {
  useCreateClassModal,
} from "components/modules/Modal/CreateClass";
import JoinClassModal, {
  useJoinClassModal,
} from "components/modules/Modal/JoinClass";
import useAuth from "hooks/useAuth";
import useClass from "hooks/useClasses";

const ListClasses = () => {
  const { user } = useAuth();
  const { classes, seperateMyClassAndOtherClass } = useClass();
  const { openCreateClass, isCreateClassOpen, closeCreateClass } =
    useCreateClassModal();
  const { openJoinClass, isJoinClassOpen, closeJoinClass } =
    useJoinClassModal();

  return (
    <div className="container p-2 md:p-8 overflow-y-auto">
      {classes.length > 0 && (
        <div className="w-full mb-12">
          <h1 className="text-xl font-bold">Kelas</h1>
          <div className="flex flex-wrap -ml-4" style={{ minHeight: "200px" }}>
            {classes.map((data) => (
              <ClassCard data={data} />
            ))}
          </div>
        </div>
      )}
      <div className="w-full mb-12">
        <h1 className="text-xl font-bold">Kelas Saya</h1>
        <div className="flex flex-wrap -ml-4" style={{ minHeight: "200px" }}>
          {seperateMyClassAndOtherClass(user?.id ?? "").map((data) => (
            <ClassCard data={data} />
          ))}
          <ClassCard isExtra openCreateClass={openCreateClass} />
        </div>
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

export default ListClasses;

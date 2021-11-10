import ClassCard from "components/elements/Classes/class.card";
import CreateClassModal, {
  useCreateClassModal,
} from "components/modules/Modal/CreateClass";
import JoinClassModal, {
  useJoinClassModal,
} from "components/modules/Modal/JoinClass";
import useStyle from "context/styleContext";
import useClass from "hooks/useClasses";
import Skeleton from "react-loading-skeleton";

const ListClasses = () => {
  const { classes, loadingClass } = useClass();
  const { openCreateClass, isCreateClassOpen, closeCreateClass } =
    useCreateClassModal();
  const { openJoinClass, isJoinClassOpen, closeJoinClass } =
    useJoinClassModal();
  const { isSidebarOpen } = useStyle();

  return (
    <div
      className={`${
        isSidebarOpen ? "w-16" : ""
      } container p-4 md:p-8 overflow-y-auto border-gray-700 border-l sm:border-l-0`}
    >
      <div className="w-full mb-12">
        <h1 className="text-xl font-bold">Kelas</h1>
        <div className="flex flex-wrap -ml-4" style={{ minHeight: "200px" }}>
          {loadingClass ? (
            <Skeleton
              width={230}
              height={240}
              style={{ margin: "1rem" }}
              count={3}
            />
          ) : (
            classes.map((data) => <ClassCard data={data} />)
          )}
          {!loadingClass && (
            <ClassCard isExtra openCreateClass={openCreateClass} />
          )}
        </div>
      </div>
      {/* <div className="w-full mb-12">
        <h1 className="text-xl font-bold">Kelas Saya</h1>
        <div className="flex flex-wrap -ml-4" style={{ minHeight: "200px" }}>
          {seperateMyClassAndOtherClass(user?.id ?? "").map((data) => (
            <ClassCard data={data} />
          ))}
          <ClassCard isExtra openCreateClass={openCreateClass} />
        </div>
      </div> */}
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

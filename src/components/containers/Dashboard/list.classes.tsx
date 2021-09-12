import ClassCard from "components/elements/Classes/class.card";
import useClass from "hooks/useClasses";

const ListClasses = () => {
  const { classes } = useClass();

  return (
    <div className="container px-4 py-6">
      <h1 className="text-xl font-bold">Kelas</h1>
      <div className="flex flex-wrap -ml-3">
        {classes.map((data) => (
          <ClassCard data={data} />
        ))}
      </div>
    </div>
  );
};

export default ListClasses;

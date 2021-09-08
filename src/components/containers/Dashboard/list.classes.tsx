import ClassCard from "components/elements/Classes/class.card";
import useClass from "hooks/useClasses";

const ListClasses = () => {
  const { classes } = useClass();

  return (
    <div className="container p-4">
      <h1 className="text-2xl">Kelas Saya</h1>
      <div className="flex flex-wrap">
        {classes.map((data) => (
          <ClassCard data={data} />
        ))}
      </div>
    </div>
  );
};

export default ListClasses;

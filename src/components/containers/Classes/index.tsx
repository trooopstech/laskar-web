import { useParams } from "react-router-dom";

const ClassDetail = () => {
  // @ts-ignore
  const { classId } = useParams();

  return (
    <>
      <div className="container p-4">
        <h1>Halo dari {classId}</h1>
      </div>
    </>
  );
};

export default ClassDetail;

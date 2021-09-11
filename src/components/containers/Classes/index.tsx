import { useSubscription } from "@apollo/client";
import useClassDetail from "hooks/useDetailClass";
import { useEffect } from "react";
import { useParams } from "react-router";
import { JOIN_CLASS_SUBS } from "schema/classes";

const ClassDetail = () => {
  // @ts-ignore
  const { classId } = useParams();
  const { data, loading, error } = useSubscription(JOIN_CLASS_SUBS, {
    variables: { classId },
  });
  const { classDetail } = useClassDetail();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <div className="container p-4">
        <h1>Kelas {classDetail?.name}</h1>
      </div>
    </>
  );
};

export default ClassDetail;

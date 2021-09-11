import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { JOIN_CLASS } from "schema/classes";

const useJoinClass = () => {
  const history = useHistory();
  const [joinClass] = useMutation(JOIN_CLASS);

  const join = async (classId: string) => {
    try {
      const res = await joinClass({ variables: { classId } });

      if (res) {
        history.push(`/dashboard/class/${res.data.joinClass.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { join };
};

export default useJoinClass;

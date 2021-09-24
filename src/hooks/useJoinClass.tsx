import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { JOIN_CLASS, JOIN_CLASS_BY_TOKEN } from "schema/classes";

const useJoinClass = () => {
  const history = useHistory();
  const [joinClass] = useMutation(JOIN_CLASS);
  const [joinClassByToken] = useMutation(JOIN_CLASS_BY_TOKEN);

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

  const joinByToken = async (token: string) => {
    try {
      const res = await joinClassByToken({ variables: { token } });

      if (res) {
        history.replace(
          `/dashboard/class/${res.data.joinClassByToken.class.id}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { join, joinByToken };
};

export default useJoinClass;

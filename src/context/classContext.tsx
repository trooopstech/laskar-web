import { useMutation, useQuery } from "@apollo/client";
import useCreateClass from "hooks/useCreateClass";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  GET_ALL_CLASS,
  JOIN_CLASS,
  JOIN_CLASS_BY_TOKEN,
  LEAVE_CLASS,
} from "schema/classes";

interface ClassContextType {
  classes: Class[];
  loadingClass: boolean;
  errorClass?: any;
  createClass?: (data: CreateClassInput, cb: () => void) => void;
  joinByToken: (token: string) => void;
  join: (classId: string, allClass: Class[]) => void;
  leavingClass: (classId: string) => void;
  seperateMyClassAndOtherClass: (userId: string) => Class[];
}

const ClassContext = createContext<ClassContextType>({} as ClassContextType);

export function ClassProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const history = useHistory();
  const [classes, setClasses] = useState<Class[]>([]);
  const [errorClass, setError] = useState<any>();
  const [loadingClass, setLoading] = useState<boolean>(false);
  const { data, loading, error } = useQuery(GET_ALL_CLASS);
  const [joinClassByToken] = useMutation(JOIN_CLASS_BY_TOKEN);
  const [leaveClass] = useMutation(LEAVE_CLASS);
  const [joinClass] = useMutation(JOIN_CLASS);
  const {
    createClassAction,
    createClassData,
    createClassError,
    createClassLoading,
  } = useCreateClass();

  useEffect(() => {
    if (data) {
      if (window.localStorage.getItem("class")) {
        joinByToken(window.localStorage.getItem("class") as string);
        window.localStorage.removeItem("class");
      } else {
        setClasses([...classes, ...data.getAllClass]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (createClassData) {
      setClasses([...classes, createClassData.createClass]);
    }
  }, [createClassData]);

  useEffect(() => {
    setError(error);
  }, [error]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    setLoading(createClassLoading);
  }, [createClassLoading]);

  useEffect(() => {
    setError(createClassError);
  }, [createClassError]);

  const createClass = (data: CreateClassInput, cb: () => void): void => {
    createClassAction({ variables: { data } });
    cb();
  };

  const joinByToken = async (token: string) => {
    try {
      const res = await joinClassByToken({ variables: { token } });

      if (res) {
        setClasses([...classes, res.data.joinClassByToken.class]);
        history.replace(
          `/dashboard/class/${res.data.joinClassByToken.class.id}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const join = async (classId: string, allClass: Class[]) => {
    try {
      const res = await joinClass({ variables: { classId } });

      if (res) {
        setClasses([...classes, ...allClass, res.data.joinClass.class]);
        history.replace(`/dashboard/class/${res.data.joinClass.class.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const leavingClass = async (classId: string) => {
    try {
      const res = await leaveClass({ variables: { classId } });
      if (res) {
        setClasses(
          classes.filter((c) => c.id !== res.data.leaveClass.class.id)
        );
        history.replace(`/dashboard`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const seperateMyClassAndOtherClass = (userId: string) => {
    const myClass = classes.filter((c) => c?.creator?.id === userId);

    return myClass;
  };

  const memoedValue = useMemo(
    () => ({
      classes,
      loadingClass,
      errorClass,
      createClass,
      joinByToken,
      join,
      leavingClass,
      seperateMyClassAndOtherClass,
    }),
    [classes, loadingClass, errorClass]
  );

  return (
    <ClassContext.Provider value={memoedValue}>
      {children}
    </ClassContext.Provider>
  );
}

export default ClassContext;

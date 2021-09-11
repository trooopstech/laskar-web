import { useMutation, useQuery } from "@apollo/client";
import useCreateClass from "hooks/useCreateClass";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { GET_ALL_CLASS, JOIN_CLASS, JOIN_CLASS_BY_TOKEN } from "schema/classes";

interface ClassContextType {
  classes: Class[];
  loadingClass: boolean;
  errorClass?: any;
  createClass?: (data: CreateClassInput, cb: () => void) => void;
  joinByToken: (token: string) => void;
  join: (classId: string, allClass: Class[]) => void;
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
        join(window.localStorage.getItem("class") as string, data.getAllClass);
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

  function createClass(data: CreateClassInput, cb: () => void): void {
    createClassAction({ variables: { data } });
    cb();
  }

  const joinByToken = async (token: string) => {
    try {
      const res = await joinClassByToken({ variables: { token } });

      if (res) {
        setClasses([...classes, res.data.joinClassByToken]);
        history.replace(`/dashboard/class/${res.data.joinClassByToken.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const join = async (classId: string, allClass: Class[]) => {
    try {
      const res = await joinClass({ variables: { classId } });

      if (res) {
        setClasses([...classes, ...allClass, res.data.joinClass]);
        history.replace(`/dashboard/class/${res.data.joinClass.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      classes,
      loadingClass,
      errorClass,
      createClass,
      joinByToken,
      join,
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

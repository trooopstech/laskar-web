import { useQuery } from "@apollo/client";
import useCreateClass from "hooks/useCreateClass";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { GET_ALL_CLASS } from "schema/classes";

interface ClassContextType {
  classes: Class[];
  loadingClass: boolean;
  errorClass?: any;
  createClass?: (data: CreateClassInput, cb: () => void) => void;
}

const ClassContext = createContext<ClassContextType>({} as ClassContextType);

export function ClassProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [classes, setClasses] = useState<Class[]>([]);
  const [errorClass, setError] = useState<any>();
  const [loadingClass, setLoading] = useState<boolean>(false);
  const { data, loading, error } = useQuery(GET_ALL_CLASS);
  const {
    createClassAction,
    createClassData,
    createClassError,
    createClassLoading,
  } = useCreateClass();

  useEffect(() => {
    if (data) {
      setClasses(data.getAllClass);
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

  const memoedValue = useMemo(
    () => ({
      classes,
      loadingClass,
      errorClass,
      createClass,
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

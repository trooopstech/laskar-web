import { useQuery } from "@apollo/client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { GET_CLASS } from "schema/classes";

interface ClassDetailContextType {
  classDetail?: Class;
  loadingClass: boolean;
  errorClass?: any;
}

const ClassDetailContext = createContext<ClassDetailContextType>(
  {} as ClassDetailContextType
);

export function ClassDetailProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}): JSX.Element {
  const [classDetail, setClass] = useState<Class>();
  const [errorClass, setError] = useState<any>();
  const [loadingClass, setLoading] = useState<boolean>(false);
  const { data, loading, error } = useQuery(GET_CLASS, {
    variables: { classId: id },
  });

  useEffect(() => {
    if (data) {
      setClass(data.getClass);
    }
  }, [data]);

  useEffect(() => {
    setError(error);
  }, [error]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const memoedValue = useMemo(
    () => ({
      classDetail,
      loadingClass,
      errorClass,
    }),
    [classDetail, loadingClass, errorClass]
  );

  return (
    <ClassDetailContext.Provider value={memoedValue}>
      {children}
    </ClassDetailContext.Provider>
  );
}

export default ClassDetailContext;

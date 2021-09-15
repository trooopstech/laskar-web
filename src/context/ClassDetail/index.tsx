import { useMutation, useQuery } from "@apollo/client";
import useOnCategoryDeleted from "context/ClassDetail/subscription/onCategoryDeleted";
import useOnNewCategory from "context/ClassDetail/subscription/onNewCategory";
import useOnNewChannel from "context/ClassDetail/subscription/onNewChannel";
import useCreateCategory from "hooks/useCreateCategory";
import useCreateChannel from "hooks/useCreateChannel";
import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { DELETE_CATEGORY } from "schema/channels";
import { GET_CLASS } from "schema/classes";
import { ClassDetailReducer, initialState } from "./reducer";

interface ClassDetailContextType {
  classDetail?: Class;
  loadingClass: boolean;
  errorClass?: any;
  createCategoryChannel: (data: CreateCategoryInput) => void;
  createChannel: (data: CreateChannelInput) => void;
  deleteCategoryChannel: (categoryId: string) => void;
  getUserClassMember: () => ClassMember;
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
  const [classDetail, dispatch] = useReducer(ClassDetailReducer, initialState);
  const [errorClass, setError] = useState<any>();
  const [loadingClass, setLoading] = useState<boolean>(false);
  const { data, loading, error } = useQuery(GET_CLASS, {
    variables: { classId: id },
    fetchPolicy: "cache-and-network",
  });
  const { createCategoryAction } = useCreateCategory();
  const { createChannelAction } = useCreateChannel();
  const { category } = useOnNewCategory(id);
  const { channel } = useOnNewChannel(id);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  useOnCategoryDeleted(id);

  useEffect(() => {
    if (data) {
      dispatch({ type: "initial", payload: data.getClass });
    }
  }, [data]);

  useEffect(() => {
    setError(error);
  }, [error]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (category) {
      dispatch({
        type: "add-category",
        payload: category.onNewCategoryCreated,
      });
    }
  }, [category]);

  useEffect(() => {
    if (channel) {
      dispatch({
        type: "add-channel",
        payload: channel.onNewChannelCreated,
      });
    }
  }, [channel]);

  const createCategoryChannel = async (
    data: CreateCategoryInput
  ): Promise<void> => {
    try {
      await createCategoryAction({ variables: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  const createChannel = async (data: CreateChannelInput): Promise<void> => {
    try {
      await createChannelAction({ variables: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserClassMember = (): ClassMember => {
    const user: User = JSON.parse(
      window.localStorage.getItem("user") as string
    );

    if (classDetail.class_member) {
      return classDetail.class_member.filter(
        (u: ClassMember) => u.member.id === user.id
      )[0];
    }
    return {} as ClassMember;
  };

  const deleteCategoryChannel = async (categoryId: string) => {
    try {
      await deleteCategory({ variables: { categoryId } });
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      classDetail,
      loadingClass,
      errorClass,
      createCategoryChannel,
      deleteCategoryChannel,
      createChannel,
      getUserClassMember,
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

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
import {
  DELETE_CATEGORY,
  DELETE_CHANNEL,
  INVITE_MEMBER,
} from "schema/channels";
import {
  ADD_ADMIN_ROLE,
  CHANGE_MEMBER_ROLE,
  REMOVE_ADMIN_ROLE,
} from "schema/channels/role";
import { GET_CLASS } from "schema/classes";
import { ClassDetailReducer, initialState } from "./reducer";
import useOnNewMember from "./subscription/onNewMemberJoin";
import useOnChangedRole from "./subscription/onChangedRole";
import useOnChannelUpdated from "./subscription/onChannelUpdated";
import useMemberLeaveClass from "./subscription/onMemberLeaveClass";
import useOnChannelDeleted from "./subscription/onChannelDeleted";

interface ClassDetailContextType {
  classDetail?: Class;
  loadingClass: boolean;
  errorClass?: any;
  createCategoryChannel: (data: CreateCategoryInput) => void;
  createChannel: (data: CreateChannelInput) => Promise<Channel>;
  deleteCategoryChannel: (categoryId: string) => void;
  deleteClassChannel: (channelId: string) => void;
  getUserClassMember: () => ClassMember;
  isAdministrator: () => boolean;
  isRoleEqualParam: (role: string) => boolean;
  changeMemberRole: (data: RoleManagement) => void;
  removeMemberAsAdmin: (data: RoleManagement) => void;
  addMemberAsAdmin: (data: RoleManagement) => void;
  inviteMemberChannel: (data: InviteInput) => void;
  getFirstCategory: () => ChannelCategory[];
  splitHiddenCategory: (
    categories: ChannelCategory[],
    returnHidden: boolean
  ) => ChannelCategory[];
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
    errorPolicy: "all",
  });
  const { createCategoryAction } = useCreateCategory();
  const { createChannelAction } = useCreateChannel();
  const { category } = useOnNewCategory(id);
  const { channel } = useOnNewChannel(id);
  const { channelUpdated } = useOnChannelUpdated(id);
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    errorPolicy: "all",
  });
  const [deleteChannel] = useMutation(DELETE_CHANNEL, {
    errorPolicy: "all",
  });
  const [addMemberRole] = useMutation(CHANGE_MEMBER_ROLE, {
    errorPolicy: "all",
  });
  const [addMemberAdmin] = useMutation(ADD_ADMIN_ROLE, {
    errorPolicy: "all",
  });
  const [removeMemberAdmin] = useMutation(REMOVE_ADMIN_ROLE, {
    errorPolicy: "all",
  });
  const [inviteMember] = useMutation(INVITE_MEMBER, {
    errorPolicy: "all",
  });
  const { memberWithNewRole } = useOnChangedRole(id);
  useOnCategoryDeleted(id);
  const { channelDeleted } = useOnChannelDeleted(id);
  const { member } = useOnNewMember(id);
  const { memberLeave } = useMemberLeaveClass(id);

  useEffect(() => {
    if (data) {
      dispatch({ type: "initial", payload: data.getClass });
    }
  }, [data]);

  useEffect(() => {
    if (memberLeave) {
      dispatch({ type: "leave-member", payload: memberLeave.memberLeaveClass });
    }
  }, [memberLeave]);

  useEffect(() => {
    if (channelUpdated) {
      const member = getUserClassMember();
      if (
        !channelUpdated.onChannelUpdated.is_private ||
        channelUpdated.onChannelUpdated.members.filter(
          (m: ChannelMember) => m.member.oid === member.oid
        ).length > 0
      ) {
        dispatch({
          type: "add-channel",
          payload: channelUpdated.onChannelUpdated,
        });
      }
    }
  }, [channelUpdated]);

  useEffect(() => {
    if (channelDeleted) {
      dispatch({
        type: "remove-channel",
        payload: channelDeleted.onChannelDeleted,
      });
    }
  }, [channelDeleted]);

  useEffect(() => {
    if (member) {
      dispatch({
        type: "new-member",
        payload: {
          member: member.newMemberJoinOnClass.member,
          oid: member.newMemberJoinOnClass.oid,
          last_online: member.newMemberJoinOnClass.last_online,
          member_role: member.newMemberJoinOnClass.member_role,
        },
      });
    }
  }, [member]);

  useEffect(() => {
    if (memberWithNewRole) {
      dispatch({
        type: "role-changed",
        payload: memberWithNewRole.roleChangedActivity,
      });
    }
  }, [memberWithNewRole]);

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
      const member = getUserClassMember();
      if (
        !channel.onNewChannelCreated.is_private ||
        channel.onNewChannelCreated.members.filter(
          (m: ChannelMember) => m.member.oid === member.oid
        ).length > 0
      ) {
        dispatch({
          type: "add-channel",
          payload: channel.onNewChannelCreated,
        });
      }
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

  const createChannel = async (data: CreateChannelInput): Promise<Channel> => {
    try {
      const res = await createChannelAction({ variables: { data } });

      return res.data.createChannel as Channel;
    } catch (error) {
      console.log(error);
      return {} as Channel;
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

  const deleteClassChannel = async (channelId: string) => {
    try {
      await deleteChannel({ variables: { channelId } });
    } catch (error) {
      console.log(error);
    }
  };

  const isAdministrator = (): boolean => {
    const classMember = getUserClassMember();

    const isAdmin =
      classMember?.member_role?.filter(
        (memberRole: MemberRole) => memberRole.role.name === "ADMIN"
      ).length > 0;

    return isAdmin;
  };

  const isRoleEqualParam = (role: string): boolean => {
    const classMember = getUserClassMember();

    const isSame =
      classMember?.member_role?.filter(
        (memberRole: MemberRole) => memberRole.role.name === role.toUpperCase()
      ).length > 0;

    return isSame;
  };

  const changeMemberRole = async (data: RoleManagement) => {
    try {
      await addMemberRole({
        variables: { data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeMemberAsAdmin = async (data: RoleManagement) => {
    try {
      await removeMemberAdmin({ variables: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  const addMemberAsAdmin = async (data: RoleManagement) => {
    try {
      await addMemberAdmin({ variables: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  const inviteMemberChannel = async (data: InviteInput) => {
    try {
      await inviteMember({ variables: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  const getFirstCategory = (): ChannelCategory[] => {
    return classDetail?.channel_category.filter(
      (category) => !category.hidden
    ) as ChannelCategory[];
  };

  const splitHiddenCategory = (
    categories: ChannelCategory[],
    returnHidden: boolean
  ): ChannelCategory[] => {
    const hiddenCategory = categories.filter((category) => category.hidden);
    const showedCategory = categories.filter((category) => !category.hidden);

    if (returnHidden) {
      return hiddenCategory;
    }

    return showedCategory;
  };

  const memoedValue = useMemo(
    () => ({
      classDetail,
      loadingClass,
      errorClass,
      createCategoryChannel,
      deleteCategoryChannel,
      deleteClassChannel,
      createChannel,
      getUserClassMember,
      isAdministrator,
      isRoleEqualParam,
      changeMemberRole,
      addMemberAsAdmin,
      removeMemberAsAdmin,
      inviteMemberChannel,
      getFirstCategory,
      splitHiddenCategory,
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

export const ClassDetailReducer = (
  state: Class,
  action: {
    type:
      | "initial"
      | "add-category"
      | "add-channel"
      | "new-member"
      | "leave-member"
      | "role-changed";
    payload: any;
  }
): Class => {
  switch (action.type) {
    case "initial":
      return action.payload as Class;
    case "add-category":
      return {
        ...state,
        channel_category: [
          ...(state?.channel_category as unknown as ChannelCategory[]),
          action.payload,
        ],
      };
    case "new-member":
      return {
        ...state,
        class_member: [
          ...(state.class_member as unknown as ClassMember[]),
          action.payload as ClassMember,
        ],
      };
    case "add-channel":
      let categoryNewChannel: ChannelCategory = state.channel_category.filter(
        (category) => category.id === action.payload.channel_category.id
      )[0];

      if (categoryNewChannel) {
        const cleanedCategory = {
          ...categoryNewChannel,
          channels: [...categoryNewChannel.channels, action.payload],
        };

        return {
          ...state,
          channel_category: [
            ...state.channel_category.filter(
              (category) => category.id !== categoryNewChannel.id
            ),
            cleanedCategory,
          ],
        };
      } else {
        return state;
      }
    case "role-changed":
      const targetMember = action.payload as ClassMember;

      return {
        ...state,
        class_member: [
          ...(state.class_member?.filter(
            (classMember: ClassMember) => classMember.oid !== targetMember.oid
          ) as ClassMember[]),
          targetMember,
        ],
      };
    case "leave-member":
      return {
        ...state,
        class_member: state.class_member?.filter(
          (classMember: ClassMember) => classMember.oid !== action.payload.oid
        ),
      };
    default:
      return state;
  }
};

export const initialState = {
  id: "",
  created_at: "" as unknown as Date,
  creator: null as unknown as User,
  name: "",
  description: "",
  color: "",
  banner: "",
  channel_category: [] as ChannelCategory[],
};

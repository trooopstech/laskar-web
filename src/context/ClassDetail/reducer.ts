export const ClassDetailReducer = (
  state: Class,
  action: { type: "initial" | "add-category" | "add-channel"; payload: any }
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

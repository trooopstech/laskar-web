type Channel = {
  id: string;
  name: string;
  created_at: string;
  channel_category: ChannelCategory;
  channel_type: ChannelType;
};

enum ChannelType {
  CHAT,
  QNA,
  ANNOUNCEMENT,
}

interface CreateChannelInput {
  name: string;
  channel_category_id: string;
  channel_type: ChannelType;
  class_id: string;
}

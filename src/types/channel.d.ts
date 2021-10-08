type Channel = {
  id: string;
  name: string;
  created_at: string;
  channel_category: ChannelCategory;
  channel_type: ChannelType;
  is_private: boolean;
  members: ChannelMember[];
  creator: ClassMember;
};

type ChannelMember = {
  member: ClassMember;
  channel: Channel;
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
  is_private: boolean;
  oid: string;
}

interface InviteInput {
  oids: string[];
  channel_id: string;
}

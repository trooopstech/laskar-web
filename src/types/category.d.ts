type ChannelCategory = {
  id: string;
  name: string;
  created_at: Date;
  // TODO
  channels: Channel[];
  hidden: boolean;
};

interface CreateCategoryInput {
  name: string;
  class_id: string;
}

import { Descendant } from "slate";

type ChatGroup = {
  id: string;
  name: string;
  group_messages: GroupMessages[];
  channel: Channel;
  create_at: Date;
};

type GroupMessages = {
  created_at: Date;
  id: string;
  text: Descendant[];
  html: string;
  sender: ClassMember;
};

enum MessageType {
  REGULAR,
  LATEX,
  SYSTEM,
}

interface GroupMessagesInput {
  text: string;
  html: string;
  type: MessageType;
  sender_id: string;
  chat_group_id?: string;
}

import { Descendant } from "slate";

type Comment = {
  id?: string;
  text: Descendant[];
  created_at: Date;
  sender: ClassMember;
  is_anon: boolean;
};

interface CommentInput {
  text: string;
  post_id?: string;
  sender_id: string;
  is_anon: boolean;
}

import { Descendant } from "slate";
import { Comment } from "./comment";

type Post = {
  id?: string;
  text: Descendant[];
  created_at: Date;
  sender: ClassMember;
  is_anon: boolean;
  comment: Comment[];
};

interface PostInput {
  text: string;
  qna_id?: string;
  sender_id: string;
  is_anon: boolean;
}

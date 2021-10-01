import { Descendant } from "slate";
import { ApprovedBy } from "./post";

type Comment = {
  id?: string;
  text: Descendant[];
  created_at: Date;
  sender: ClassMember;
  is_anon: boolean;
  approved_by: ApprovedBy[];
};

interface CommentInput {
  text: string;
  post_id?: string;
  sender_id: string;
  is_anon: boolean;
}

interface ApproveCommentInput {
  approver_id: string;
  comment_id: string;
  post_id?: string;
}

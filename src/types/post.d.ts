import { Descendant } from "slate";
import { Comment } from "./comment";

type ApprovedBy = {
  created_at: Date;
  approver: ClassMember;
};

type PostVoter = {
  created_at: Date;
  voter: ClassMember;
};

type Post = {
  id?: string;
  text: Descendant[];
  created_at: Date;
  sender: ClassMember;
  is_anon: boolean;
  comment: Comment[];
  voter: PostVoter[];
};

interface PostInput {
  text: string;
  qna_id?: string;
  sender_id: string;
  is_anon: boolean;
}

interface UpvotePost {
  post_id: string;
  voter_id: string;
}

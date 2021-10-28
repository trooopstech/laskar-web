import { useQuery } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GET_POST } from "schema/channels/qna";
import { ApproveCommentInput, Comment, CommentInput } from "types/comment";
import { Post } from "types/post";
import useSendApprove from "../hooks/sendApprove";
import useSendComment from "../hooks/sendComment";
import useSendUnapprove from "../hooks/sendUnapprove";

interface PostContextType {
  post?: Post;
  loading: boolean;
  error?: any;
  createCommentLoading: boolean;
  approveLoading: boolean;
  unapproveLoading: boolean;
  sendComment: (data: CommentInput) => void;
  sendApprove: (data: ApproveCommentInput) => void;
  sendUnapprove: (data: ApproveCommentInput) => void;
  commentIsApprovedByMe: (comment: Comment, member: ClassMember) => boolean;
}

const PostContext = createContext<PostContextType>({} as PostContextType);

export function PostProvider({
  id,
  channelId,
  children,
}: {
  id: string;
  channelId: string;
  children: ReactNode;
}): JSX.Element {
  const [post, setPost] = useState<Post>();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: {
      postId: id,
    },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });
  const { createComment, createCommentLoading } = useSendComment();
  const { approveComment, approveLoading } = useSendApprove();
  const { unapproveComment, unapproveLoading } = useSendUnapprove();

  useEffect(() => {
    if (data) {
      setPost(data.getCommentsOnPost);
    }
  }, [data]);

  const sendComment = async (data: CommentInput) => {
    try {
      const res = await createComment({
        variables: {
          data: {
            ...data,
            post_id: id,
          },
          postId: id,
          channelId,
        },
      });

      if (res) {
        setPost({
          ...(post as Post),
          comment: [
            ...(post?.comment as Comment[]),
            res.data.createComment as Comment,
          ] as Comment[],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendApprove = async (data: ApproveCommentInput) => {
    try {
      await approveComment({
        variables: {
          data: {
            ...data,
            post_id: id,
          },
          channelId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendUnapprove = async (data: ApproveCommentInput) => {
    try {
      await unapproveComment({
        variables: {
          data: {
            ...data,
            post_id: id,
          },
          channelId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const commentIsApprovedByMe = (
    comment: Comment,
    member: ClassMember
  ): boolean => {
    const approver = comment.approved_by;

    if (approver.filter((a) => a.approver.oid === member.oid).length > 0) {
      return true;
    }

    return false;
  };

  const memoedValue = useMemo(
    () => ({
      post,
      loading,
      error,
      createCommentLoading,
      sendComment,
      sendApprove,
      sendUnapprove,
      unapproveLoading,
      approveLoading,
      commentIsApprovedByMe,
    }),
    [post, loading, error, createCommentLoading, approveLoading]
  );

  return (
    <PostContext.Provider value={memoedValue}>{children}</PostContext.Provider>
  );
}

const usePost = () => {
  return useContext(PostContext);
};

export default usePost;

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
import { Comment, CommentInput } from "types/comment";
import { Post } from "types/post";
import useSendComment from "../hooks/sendComment";

interface PostContextType {
  post?: Post;
  loading: boolean;
  error?: any;
  createCommentLoading: boolean;
  sendComment: (data: CommentInput) => void;
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
  });
  const { createComment, createCommentLoading } = useSendComment();

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

  const memoedValue = useMemo(
    () => ({
      post,
      loading,
      error,
      createCommentLoading,
      sendComment,
    }),
    [post, loading, error, createCommentLoading]
  );

  return (
    <PostContext.Provider value={memoedValue}>{children}</PostContext.Provider>
  );
}

const usePost = () => {
  return useContext(PostContext);
};

export default usePost;

import { useQuery } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GET_MY_POST } from "schema/channels/qna";
import { Post, PostUpdate } from "types/post";
import useDeletePost from "../hooks/deletePost";
import useUpdatePost from "../hooks/updatePost";

interface MyPostContextType {
  post?: Post[];
  loading: boolean;
  error?: any;
  updateLoading: boolean;
  removePost: (postId: string, channelId: string) => void;
  updatingPost: (data: PostUpdate, channelId: string) => void;
}

const MyPostContext = createContext<MyPostContextType>({} as MyPostContextType);

export function MyPostProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}): JSX.Element {
  const [post, setPost] = useState<Post[]>();
  const { data, loading, error } = useQuery(GET_MY_POST, {
    variables: {
      memberId: id,
    },
    fetchPolicy: "cache-and-network",
  });
  const { deletePost } = useDeletePost();
  const { updatePost, updateLoading } = useUpdatePost();

  useEffect(() => {
    if (data) {
      setPost(data.getUserPost);
    }
  }, [data]);

  const removePost = async (postId: string, channelId: string) => {
    try {
      const res = await deletePost({
        variables: {
          postId,
          channelId,
        },
      });

      if (res.data) {
        setPost(post?.filter((p: Post) => p.id !== res.data.deletePost));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatingPost = async (data: PostUpdate, channelId: string) => {
    try {
      await updatePost({
        variables: {
          data,
          channelId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      post,
      loading,
      error,
      removePost,
      updatingPost,
      updateLoading,
    }),
    [post, loading, error, updateLoading]
  );

  return (
    <MyPostContext.Provider value={memoedValue}>
      {children}
    </MyPostContext.Provider>
  );
}

const useMyPost = () => {
  return useContext(MyPostContext);
};

export default useMyPost;

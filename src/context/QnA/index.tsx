import { useQuery } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GET_QNA } from "schema/channels/qna";
import { Post, PostInput, UpvotePost } from "types/post";
import useSendPost from "./hooks/sendPost";
import useUpvotePost from "./hooks/sendVote";
import useOnNewPost from "./subscription/useOnNewPost";
import useOnPostCommented from "./subscription/useOnPostCommented";
import useOnPostUpvoted from "./subscription/useOnPostUpvoted";

interface QnAContextType {
  qna?: QnA;
  loading: boolean;
  error?: any;
  createPostLoading: boolean;
  sendPost: (data: PostInput) => void;
  voteLoading: boolean;
  votePost: (data: UpvotePost) => void;
}

const QnAContext = createContext<QnAContextType>({} as QnAContextType);

export function QnAProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}): JSX.Element {
  const [qna, setQna] = useState<QnA>();
  const { data, loading, error } = useQuery(GET_QNA, {
    variables: {
      channelId: id,
    },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });
  const { createPost, createPostLoading } = useSendPost();
  const { sendUpvote, voteLoading } = useUpvotePost();
  const { newPost } = useOnNewPost(id);
  useOnPostCommented(id);
  useOnPostUpvoted(id);

  useEffect(() => {
    if (data) {
      setQna(data.getQnA);
    }
  }, [data]);

  useEffect(() => {
    if (newPost) {
      setQna({
        ...qna,
        post: [...(qna?.post as Post[]), newPost.onNewPost as Post] as Post[],
      });
    }
  }, [newPost]);

  const sendPost = async (data: PostInput) => {
    try {
      await createPost({
        variables: {
          data: {
            ...data,
            qna_id: qna?.id,
          },
          channelId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const votePost = async (data: UpvotePost) => {
    try {
      await sendUpvote({
        variables: {
          channelId: id,
          data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      qna,
      loading,
      error,
      createPostLoading,
      sendPost,
      voteLoading,
      votePost,
    }),
    [qna, loading, error, createPostLoading, voteLoading]
  );

  return (
    <QnAContext.Provider value={memoedValue}>{children}</QnAContext.Provider>
  );
}

const useQnA = () => {
  return useContext(QnAContext);
};

export default useQnA;

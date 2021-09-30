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
import { Post, PostInput } from "types/post";
import useSendPost from "./hooks/sendPost";

interface QnAContextType {
  qna?: QnA;
  loading: boolean;
  error?: any;
  createPostLoading: boolean;
  sendPost: (data: PostInput) => void;
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
  });
  const { createPost, createPostLoading } = useSendPost();

  useEffect(() => {
    if (data) {
      setQna(data.getQnA);
    }
  }, [data]);

  const sendPost = async (data: PostInput) => {
    try {
      const res = await createPost({
        variables: {
          data: {
            ...data,
            qna_id: qna?.id,
          },
        },
      });

      if (res) {
        setQna({
          ...qna,
          post: [
            ...(qna?.post as Post[]),
            res.data.createPost as Post,
          ] as Post[],
        });
      }
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
    }),
    [qna, loading, error, createPostLoading]
  );

  return (
    <QnAContext.Provider value={memoedValue}>{children}</QnAContext.Provider>
  );
}

const useQnA = () => {
  return useContext(QnAContext);
};

export default useQnA;

import { gql } from "@apollo/client";

export const GET_QNA = gql`
  query GetQnA($channelId: String!) {
    getQnA(channelId: $channelId) {
      id
      name
      post {
        id
        text
        created_at
        is_anon
        comment {
          id
        }
        voter {
          voter {
            oid
          }
        }
        approved_by {
          approver {
            member {
              name
            }
          }
        }
        sender {
          oid
          member {
            id
            name
            color
          }
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($data: PostInput!, $channelId: String!) {
    createPost(data: $data, channelId: $channelId) {
      id
      text
      created_at
      is_anon
      comment {
        id
      }
      voter {
        voter {
          oid
        }
      }
      approved_by {
        approver {
          member {
            name
          }
        }
      }
      sender {
        oid
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query GetCommentOnPost($postId: String!) {
    getCommentsOnPost(postId: $postId) {
      id
      text
      created_at
      is_anon
      comment {
        id
        is_anon
        text
        created_at
        sender {
          oid
          member {
            id
            name
            color
          }
        }
        approved_by {
          approver {
            member {
              id
              name
            }
          }
        }
      }
      sender {
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const GET_MY_POST = gql`
  query GetUserPost($memberId: String!) {
    getUserPost(memberId: $memberId) {
      id
      text
      qna {
        id
        channel {
          id
        }
      }
      created_at
      is_anon
      comment {
        id
      }
      voter {
        voter {
          oid
        }
      }
      approved_by {
        approver {
          member {
            name
          }
        }
      }
      sender {
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: String!, $channelId: String!) {
    deletePost(postId: $postId, channelId: $channelId)
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($data: PostUpdate!, $channelId: String!) {
    updatePost(data: $data, channelId: $channelId) {
      id
      text
      created_at
      is_anon
      comment {
        id
      }
      voter {
        voter {
          oid
        }
      }
      qna {
        id
        channel {
          id
        }
      }
      approved_by {
        approver {
          member {
            name
          }
        }
      }
      sender {
        oid
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $data: CommentInput!
    $postId: String!
    $channelId: String!
  ) {
    createComment(data: $data, postId: $postId, channelId: $channelId) {
      id
      text
      created_at
      is_anon
      approved_by {
        approver {
          member {
            name
          }
        }
      }
      sender {
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const UPVOTE_POST = gql`
  mutation UpvotePost($channelId: String!, $data: UpvotePost!) {
    upvotePost(channelId: $channelId, data: $data) {
      id
      text
      created_at
      is_anon
      comment {
        id
      }
      voter {
        voter {
          oid
        }
      }
      approved_by {
        approver {
          member {
            name
          }
        }
      }
      sender {
        oid
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const APPROVE_COMMENT = gql`
  mutation ApproveComment($channelId: String!, $data: ApproveCommentInput!) {
    approveComment(channelId: $channelId, data: $data) {
      id
      text
      created_at
      is_anon
      comment {
        id
        is_anon
        text
        created_at
        sender {
          oid
          member {
            id
            name
            color
          }
        }
        approved_by {
          approver {
            member {
              id
              name
            }
          }
        }
      }
      sender {
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const UNAPPROVE_COMMENT = gql`
  mutation UnapproveComment($channelId: String!, $data: ApproveCommentInput!) {
    unapproveComment(channelId: $channelId, data: $data) {
      id
      text
      created_at
      is_anon
      comment {
        id
        is_anon
        text
        created_at
        sender {
          oid
          member {
            id
            name
            color
          }
        }
        approved_by {
          approver {
            member {
              id
              name
            }
          }
        }
      }
      sender {
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const ON_NEW_POST = gql`
  subscription OnNewPost($channelId: String!) {
    onNewPost(channelId: $channelId) {
      id
      text
      created_at
      is_anon
      comment {
        id
      }
      voter {
        voter {
          oid
        }
      }
      approved_by {
        approver {
          member {
            name
          }
        }
      }
      sender {
        oid
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const ON_UPVOTE = gql`
  subscription OnPostUpvoted($channelId: String!) {
    onPostUpvoted(channelId: $channelId) {
      id
      text
      created_at
      is_anon
      comment {
        id
      }
      voter {
        voter {
          oid
        }
      }
      approved_by {
        approver {
          member {
            name
          }
        }
      }
      sender {
        oid
        member {
          id
          name
          color
        }
      }
    }
  }
`;

export const ON_POST_COMMENTED = gql`
  subscription OnPostCommented($channelId: String!) {
    onPostCommented(channelId: $channelId) {
      id
      text
      created_at
      is_anon
      comment {
        id
      }
      voter {
        voter {
          oid
        }
      }
      approved_by {
        approver {
          member {
            name
          }
        }
      }
      sender {
        oid
        member {
          id
          name
          color
        }
      }
    }
  }
`;

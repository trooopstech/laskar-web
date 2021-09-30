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
      }
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

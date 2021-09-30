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
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
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
  mutation CreateComment($data: CommentInput!) {
    createComment(data: $data) {
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

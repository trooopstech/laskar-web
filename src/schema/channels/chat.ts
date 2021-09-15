import { gql } from "@apollo/client";

export const GET_CHAT_GROUP = gql`
  query GetChatGroup($channelId: String!) {
    getChatGroup(channelId: $channelId) {
      id
      name
      channel {
        id
        name
      }
      group_messages {
        created_at
        id
        text
        html
        chat_group_id
        sender {
          oid
          member {
            id
            name
            email
          }
        }
      }
    }
  }
`;

export const CREATE_GROUP_MESSAGE = gql`
  mutation CreateGroupMessages(
    $channelId: String!
    $data: GroupMessagesInput!
  ) {
    createGroupMessages(channelId: $channelId, data: $data) {
      id
      created_at
      text
      html
      type
      chat_group_id
      sender {
        oid
        member {
          id
          name
          email
        }
      }
    }
  }
`;

export const ON_NEW_MESSAGES = gql`
  subscription OnNewMessages($channelId: String!) {
    onNewMessage(channelId: $channelId) {
      id
      created_at
      text
      html
      type
      chat_group_id
      sender {
        oid
        member {
          id
          name
          email
        }
      }
    }
  }
`;

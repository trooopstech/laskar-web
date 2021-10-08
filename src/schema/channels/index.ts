import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CategoryInput!) {
    createCategory(data: $data) {
      id
      created_at
      name
      hidden
      channels {
        id
        name
        channel_granted_role {
          role {
            id
            name
          }
        }
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryId: String!) {
    deleteCategory(categoryId: $categoryId) {
      id
      created_at
      name
      hidden
      channels {
        id
        name
      }
    }
  }
`;

export const ON_NEW_CATEGORY_CREATED = gql`
  subscription OnNewCategoryCreated($classId: String!) {
    onNewCategoryCreated(classId: $classId) {
      id
      created_at
      name
      channels {
        id
        name
      }
    }
  }
`;

export const ON_CATEGORY_DELETED = gql`
  subscription OnCategoryDeleted($classId: String!) {
    onCategoryDeleted(classId: $classId) {
      id
      created_at
      name
      hidden
      channels {
        id
        name
      }
    }
  }
`;

export const DELETE_CHANNEL = gql`
  mutation deleteChannel($channelId: String!) {
    deleteChannel(channelId: $channelId) {
      id
      created_at
      name
      channel_type
      channel_category {
        id
        name
      }
      channel_granted_role {
        role {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($data: ChannelInput!) {
    createChannel(data: $data) {
      id
      created_at
      name
      channel_type
      channel_category {
        id
        name
      }
      members {
        member {
          oid
        }
      }
      channel_granted_role {
        role {
          id
          name
        }
      }
    }
  }
`;

export const INVITE_MEMBER = gql`
  mutation InviteChannelMember($data: InviteInput!) {
    inviteChannelMember(data: $data) {
      id
      created_at
      name
      channel_type
      is_private
      channel_category {
        id
        name
      }
      members {
        member {
          oid
        }
      }
      channel_granted_role {
        role {
          id
          name
        }
      }
    }
  }
`;

export const ON_NEW_CHANNEL_CREATED = gql`
  subscription OnNewChannelCreated($classId: String!) {
    onNewChannelCreated(classId: $classId) {
      id
      created_at
      name
      channel_type
      is_private
      channel_category {
        id
        name
      }
      members {
        member {
          oid
        }
      }
      channel_granted_role {
        role {
          id
          name
        }
      }
    }
  }
`;

export const ON_CHANNEL_DELETED = gql`
  subscription OnChannelDeleted($classId: String!) {
    onChannelDeleted(classId: $classId) {
      id
      created_at
      name
      channel_type
      channel_category {
        id
        name
      }
      channel_granted_role {
        role {
          id
          name
        }
      }
    }
  }
`;

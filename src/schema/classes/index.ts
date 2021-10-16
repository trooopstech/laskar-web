import { gql } from "@apollo/client";

export const GET_ALL_CLASS = gql`
  query GetAllClass {
    getAllClass {
      id
      color
      banner
      description
      name
      creator {
        id
      }
    }
  }
`;

export const CREATE_CLASS = gql`
  mutation CreateClass($data: CreateClassInput!) {
    createClass(data: $data) {
      id
      color
      banner
      description
      name
      creator {
        id
      }
    }
  }
`;

export const GET_CLASS = gql`
  query GetClass($classId: String!) {
    getClass(classId: $classId) {
      id
      color
      banner
      description
      name
      creator {
        id
        email
      }
      channel_category {
        id
        name
        hidden
        channels {
          id
          name
          channel_type
          is_private
          channel_granted_role {
            role {
              name
            }
          }
          creator {
            oid
          }
          members {
            member {
              oid
            }
          }
        }
      }
      class_member {
        member {
          id
          name
          email
          color
        }
        oid
        last_online
        member_role {
          role {
            name
          }
        }
      }
    }
  }
`;

export const GET_CLASS_TOKEN = gql`
  query GetClassToken($classId: String!, $keyword: String!) {
    getClassToken(classId: $classId, keyword: $keyword) {
      token
      link_join
    }
  }
`;

export const GET_CLASS_BY_TOKEN = gql`
  query GetClassByToken($token: String!) {
    getClassByToken(token: $token) {
      id
      color
      banner
      description
      name
      class_member {
        member {
          id
          email
          name
          color
        }
      }
    }
  }
`;

export const JOIN_CLASS = gql`
  mutation JoinClass($classId: String!) {
    joinClass(classId: $classId) {
      class {
        id
        color
        banner
        description
        name
      }
      member {
        id
        name
        email
        color
      }
      oid
      last_online
      member_role {
        role {
          name
        }
      }
    }
  }
`;

export const JOIN_CLASS_BY_TOKEN = gql`
  mutation JoinClassByToken($token: String!) {
    joinClassByToken(token: $token) {
      class {
        id
        color
        banner
        description
        name
      }
      member {
        id
        name
        email
        color
      }
      oid
      last_online
      member_role {
        role {
          name
        }
      }
    }
  }
`;

export const ON_NEW_MEMBER_JOIN = gql`
  subscription NewMemberJoinOnClass($classId: String!) {
    newMemberJoinOnClass(classId: $classId) {
      class {
        id
        color
        banner
        description
        name
      }
      member {
        id
        name
        email
        color
      }
      oid
      last_online
      member_role {
        role {
          name
        }
      }
    }
  }
`;

export const ONLINE_MEMBER_SUBS = gql`
  subscription MemberOnline($classId: String!) {
    memberOnline(classId: $classId) {
      id
      name
      email
    }
  }
`;

export const LEAVE_CLASS = gql`
  mutation LeaveClass($classId: String!) {
    leaveClass(classId: $classId) {
      oid
      class {
        id
      }
    }
  }
`;

export const ON_LEAVE_CLASS = gql`
  subscription MemberLeaveClass($classId: String!) {
    memberLeaveClass(classId: $classId) {
      oid
      class {
        id
      }
    }
  }
`;

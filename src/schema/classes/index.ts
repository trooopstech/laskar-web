import { gql } from "@apollo/client";

export const GET_ALL_CLASS = gql`
  query GetAllClass {
    getAllClass {
      id
      color
      banner
      description
      name
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
      class_member {
        member {
          id
          email
        }
        last_online
      }
    }
  }
`;

export const GET_CLASS_TOKEN = gql`
  query GetClassToken($classId: String!) {
    getClassToken(classId: $classId) {
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
        }
      }
    }
  }
`;

export const JOIN_CLASS = gql`
  mutation JoinClass($classId: String!) {
    joinClass(classId: $classId) {
      id
      color
      banner
      description
      name
    }
  }
`;

export const JOIN_CLASS_BY_TOKEN = gql`
  mutation JoinClassByToken($token: String!) {
    joinClassByToken(token: $token) {
      id
      color
      banner
      description
      name
    }
  }
`;

export const JOIN_CLASS_SUBS = gql`
  subscription NewMemberJoinOnClass($classId: String!) {
    newMemberJoinOnClass(classId: $classId) {
      id
      name
      email
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

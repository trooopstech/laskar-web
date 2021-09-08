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
      }
    }
  }
`;

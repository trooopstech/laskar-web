import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: UserLoginInput!) {
    login(data: $data) {
      user {
        id
        email
        photo
        color
        name
      }
      token
      error {
        code
        message
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($data: UserCreateInput!) {
    register(data: $data) {
      user {
        id
        email
        photo
        color
        name
      }
      token
      error {
        code
        message
      }
    }
  }
`;

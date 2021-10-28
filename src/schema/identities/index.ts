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
        birthdate
        gender
        phone_number
      }
      token
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
        birthdate
        gender
        phone_number
      }
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UserUpdateInput!) {
    updateUser(data: $data) {
      id
      email
      photo
      color
      name
      birthdate
      gender
      phone_number
    }
  }
`;

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($token: String!) {
    googleLogin(token: $token) {
      user {
        id
        email
        photo
        color
        name
        birthdate
        gender
        phone_number
      }
      token
    }
  }
`;

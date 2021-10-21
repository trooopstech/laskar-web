import { gql } from "@apollo/client";

export const GET_PRE_SIGNED_URL = gql`
  mutation GetPreSignedUrl($fileName: String!, $contentType: String!) {
    getPreSignedUrl(fileName: $fileName, content_type: $contentType) {
      key
      content_type
      url
    }
  }
`;

export const SAVE_ATTACHMENT = gql`
  mutation SaveAttachment($key: String!, $contentType: String!) {
    saveAttachment(key: $key, content_type: $contentType) {
      id
      key
      content_type
      url
    }
  }
`;

import { gql } from "@apollo/client";

export const REGISTER_DEVICE_KEY = gql`
  mutation RegisterDeviceKey($device_key: String!) {
    registerDeviceKey(device_key: $device_key) {
      id
    }
  }
`;

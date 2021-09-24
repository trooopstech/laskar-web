import { gql } from "@apollo/client";

export const CHANGE_MEMBER_ROLE = gql`
  mutation ChangeMemberRole($data: RoleManagement!) {
    addRoleToClassMember(data: $data) {
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

export const ADD_ADMIN_ROLE = gql`
  mutation AddAdminRole($data: RoleManagement!) {
    addAdminRoleToClassMember(data: $data) {
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

export const REMOVE_ADMIN_ROLE = gql`
  mutation RemoveAdminRole($data: RoleManagement!) {
    removeAdminRoleToClassMember(data: $data) {
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

export const ON_ROLE_CHANGED = gql`
  subscription OnRoleChanged($classId: String!) {
    roleChangedActivity(classId: $classId) {
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

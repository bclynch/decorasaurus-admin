import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const registerAdminAccountMutation: DocumentNode = gql`
  mutation registerAdminAccount($email: String!, $password: String!) {
    registerAdminAccount(input: {
      email: $email,
      password: $password
    })
    {
      customer {
        id
      }
    }
  }
`;

export const authAdminAccountMutation: DocumentNode = gql`
  mutation authenticateAdminAccount($email: String!, $password: String!) {
    authenticateAdminAccount(input:{
      email: $email,
      password: $password
    }) {
      jwtToken
    }
  }
`;

// export const resetPasswordMutation: DocumentNode = gql`
//   mutation($email: String!) {
//     resetPassword(input: {
//       email: $email
//     }) {
//       string
//     }
//   }
// `;

// export const updatePasswordMutation: DocumentNode = gql`
//   mutation($customerId: UUID!, $password: String!, $newPassword: String!) {
//     updatePassword(
//       input: {
//         customerId: $customerId,
//         password: $password,
//         newPassword: $newPassword
//       }
//     ) {
//       boolean
//     }
//   }
// `;

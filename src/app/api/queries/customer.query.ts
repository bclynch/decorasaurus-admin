import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const allCustomersQuery: DocumentNode = gql`
  query allCustomers {
    allCustomers {
      nodes {
        id,
        firstName,
        lastName,
        createdAt
      }
    }
  }
`;

export const customerByIdQuery: DocumentNode = gql`
  query customerById($customerId: UUID!) {
    customerById(id: $customerId) {
      id,
      firstName,
      lastName,
      createdAt,
      ordersByCustomerId {
        nodes {
          id,
          createdAt
        }
      }
    }
  }
`;

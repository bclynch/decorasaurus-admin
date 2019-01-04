import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const currentAdminQuery: DocumentNode = gql`
  query currentAdmin {
    currentAdmin {
      id,
      email
    }
  }
`;

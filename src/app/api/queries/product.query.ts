import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const allProductsQuery: DocumentNode = gql`
  query allProducts {
    allProducts {
      nodes {
        sku,
        name,
        slug,
        status
      }
    }
  }
`;

export const productBySkuQuery: DocumentNode = gql`
  query productBySku($productSku: String!) {
    productBySku(sku: $productSku) {
      sku,
      slug,
      name,
      description,
      status,
      createdAt,
      productPricesByProductSku {
        nodes {
          currency,
          amount
        }
      }
    }
  }
`;

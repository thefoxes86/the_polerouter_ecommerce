import { gql } from "@apollo/client";

/**
 * GraphQL countries query.
 */
const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products {
      nodes {
        image {
          link
          sourceUrl(size: LARGE)
          title(format: RENDERED)
        }
      }
    }
  }
`;

export default GET_PRODUCTS;

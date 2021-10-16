import { gql } from '@apollo/client';

/**
 * GraphQL countries query.
 */
const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products {
      nodes {
        image {
          link
          sourceUrl
          srcSet
          title(format: RENDERED)
          link
        }
        link
        slug
        sku
        name
      }
    }
  }
`;

export default GET_PRODUCTS;

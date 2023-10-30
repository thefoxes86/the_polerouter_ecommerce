import { gql } from '@apollo/client';

/**
 * GraphQL countries query.
 */
const GET_SHIPPING_METHODS = gql`
  query GET_SHIPPING_METHODS {
    shippingMethods {
      edges {
        node {
          id
          title
          databaseId
          description
        }
      }
    }
  }
`;

export default GET_SHIPPING_METHODS;

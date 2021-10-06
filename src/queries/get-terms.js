import { gql } from "@apollo/client";

/**
 * GraphQL countries query.
 */
const GET_TERMS = gql`
  query GET_TERMS {
    page(id: 168, idType: DATABASE_ID) {
      content
    }
  }
`;

export default GET_TERMS;

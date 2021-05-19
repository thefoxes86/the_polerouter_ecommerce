import { gql } from "@apollo/client";

/**
 * GraphQL countries query.
 */
const GET_POSTS = gql`
  query GET_POSTS {
    posts {
      nodes {
        content(format: RENDERED)
        date
        categories {
          edges {
            node {
              name
              uri
              slug
            }
          }
        }
        featuredImage {
          node {
            altText
            link
          }
        }
        excerpt(format: RENDERED)
        guid
        isSticky
        slug
        title(format: RENDERED)
        uri
      }
    }
  }
`;

export default GET_POSTS;

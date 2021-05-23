import { gql } from "@apollo/client";

/**
 * GraphQL countries query.
 */
const GET_HOME = gql`
  query GET_HOME {
    menus {
      nodes {
        menuItems {
          nodes {
            title
            url
            description
          }
        }
      }
    }
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
    products {
      nodes {
        image {
          link
          sourceUrl(size: LARGE)
          title(format: RENDERED)
        }
        link
        slug
        sku
        name
      }
    }
  }
`;

export default GET_HOME;

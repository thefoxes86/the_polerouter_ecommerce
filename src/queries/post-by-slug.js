import { gql } from "@apollo/client";

export const POST_BY_SLUG_QUERY = gql`
  query Post($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      author {
        node {
          firstName
          name
          nicename
          uri
          slug
          username
        }
      }
      commentCount
      commentStatus
      comments {
        nodes {
          content
          date
          approved
        }
      }
      content(format: RENDERED)
      date
      featuredImage {
        node {
          link
          title(format: RENDERED)
        }
      }
      link
      slug
      title(format: RENDERED)
      uri
      terms {
        nodes {
          link
          name
          slug
          uri
        }
      }
    }
  }
`;

export const POSTS_SLUGS = gql`
  query Posts {
    posts(first: 5000) {
      nodes {
        id
        slug
      }
    }
  }
`;

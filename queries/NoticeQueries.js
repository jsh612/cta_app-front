import { gql } from "apollo-boost";

export const SEE_NOTICE = gql`
  query seeNotice($name: String!) {
    seeNotice(name: $name) {
      ctaNotice {
        id
        content
        title
        url
      }
      eduNotice {
        id
        content
        title
        url
      }
    }
  }
`;

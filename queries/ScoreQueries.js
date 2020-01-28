import { gql } from "apollo-boost";

export const CREATE_ACC = gql`
  mutation createAcc(
    $score: Float!
    $round: Int!
    $episode: Int!
    $academy: String!
  ) {
    createAcc(
      score: $score
      round: $round
      episode: $episode
      academy: $academy
    ) {
      id
    }
  }
`;

export const CREATE_TAX_ACC = gql`
  mutation createTaxAcc(
    $score: Float!
    $round: Int!
    $episode: Int!
    $academy: String!
  ) {
    createTaxAcc(
      score: $score
      round: $round
      episode: $episode
      academy: $academy
    ) {
      id
    }
  }
`;

export const SEE_ROUND = gql`
  query seeRound($round: Int!, $episode: Int!, $academy: String!) {
    seeRound(round: $round, episode: $episode, academy: $academy) {
      accs {
        score
        user {
          username
        }
        rank
      }
      taxAccs {
        score
        user {
          username
        }
        rank
      }
      totalAccs {
        score
        user {
          username
        }
        rank
      }
    }
  }
`;

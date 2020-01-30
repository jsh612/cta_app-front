import { gql } from "apollo-boost";

export const CREATE_ACC = gql`
  mutation createAcc(
    $score: Float!
    $round: Int!
    $episode: Int!
    $academy: String!
    $year: Int!
  ) {
    createAcc(
      score: $score
      round: $round
      episode: $episode
      academy: $academy
      year: $year
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
    $year: Int!
  ) {
    createTaxAcc(
      score: $score
      round: $round
      episode: $episode
      academy: $academy
      year: $year
    ) {
      id
    }
  }
`;

export const SEE_ROUND = gql`
  query seeRound($round: Int!, $episode: Int!, $academy: String!, $year: Int!) {
    seeRound(round: $round, episode: $episode, academy: $academy, year: $year) {
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

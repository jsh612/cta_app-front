import { gql } from "apollo-boost";

export const CREATE_ACC = gql`
  mutation createAcc($score: Float!, $round: String!, $academy: String!) {
    createAcc(score: $score, round: $round, academy: $academy) {
      id
    }
  }
`;

export const CREATE_TAX_ACC = gql`
  mutation createTaxAcc($score: Float!, $round: String!, $academy: String!) {
    createTaxAcc(score: $score, round: $round, academy: $academy) {
      id
    }
  }
`;

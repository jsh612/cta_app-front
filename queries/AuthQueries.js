import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const ME = gql`
  query me {
    me {
      username
      accs {
        round
        episode
        score
        academy
        rank
        year
      }
      taxAccs {
        round
        episode
        score
        academy
        rank
        year
      }
      totalAccs {
        round
        episode
        score
        academy
        rank
        year
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $password: String!) {
    createAccount(username: $username, password: $password) {
      id
    }
  }
`;

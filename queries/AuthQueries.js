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
        score
        academy
      }
      taxAccs {
        score
        academy
      }
      taxLaw1s {
        score
        academy
      }
      taxLaw2s {
        score
        academy
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

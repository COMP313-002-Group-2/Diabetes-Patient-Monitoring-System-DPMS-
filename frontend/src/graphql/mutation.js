import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userType
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserInputType!) {
    createUser(input: $input) {
      user {
        _id
        email
      }
      token
      userType
      message
    }
  }
`;

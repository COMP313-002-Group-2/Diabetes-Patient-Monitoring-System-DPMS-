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

export const CREATE_USER_BY_ADMIN = gql`
  mutation AddUserByAdmin($input: UserInputType!) {
    addUserByAdmin(input: $input) {
      user {
        _id
        email
      }
      message
    }
  }
`;



export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UserInputType!) {
    updateUser(id: $id, input: $input) {
      firstName
      lastName
      email
    }
  }
`;


export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;



export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      user {
        userType
      }
      token
      message
    }
  }
`;


import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userType
      firstName
      lastName
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

export const GET_REMINDERS = gql`
  query GetReminders {
    getReminders{
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const ADD_REMINDER = gql`
  mutation AddReminder(
    $patientId: String!
    $reminderName: String!
    $reminderDescription: String!
    $status: String!
  ) {
    addReminder(
      patientId: $patientId
      reminderName: $reminderName
      reminderDescription: $reminderDescription
      status: $status
    ) {
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const DELETE_REMINDER = gql`
  mutation DeleteReminder($_id: ID!) {
    deleteReminder(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_REMINDER = gql`
  mutation UpdateReminder(
    $_id: ID!
    $patientId: String!
    $reminderName: String!
    $reminderDescription: String!
    $status: String!
  ) {
    updateReminder(
      _id: $_id
      patientId: $patientId
      reminderName: $reminderName
      reminderDescription: $reminderDescription
      status: $status
    ) {
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;


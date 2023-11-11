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
  mutation DeleteReminder($id: ID!) {
    deleteReminder(id: $id) {
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const GET_REMINDERS_FOR_USER = gql`
  query GetRemindersForUser($patientId: ID!) {
    getRemindersForUser(patientId: $patientId){
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const UPDATE_REMINDER = gql`
  mutation UpdateReminder($id: ID!, $input: ReminderInputType!) {
    updateReminder(id: $id, input: $input) {
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const GET_ONE_REMINDER = gql`
  query GetOneReminder($id: ID!) {
    getOneReminder(id: $id){
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

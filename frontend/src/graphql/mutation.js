import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userType
      firstName
      lastName
      email
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
    getReminders {
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

export const ADD_BLOODCHEM = gql`
  mutation addBloodchem($input: BloodchemInput!) {
    addBloodchem(input: $input) {
      _id
      patientId
      documentId
      labDate
      glucose
      altSGPT
      astSGOT
      uricAcid
      bun
      cholesterol
      triglycerides
      hdlCholesterol
      aLDL
      vLDL
      creatinine
      eGFR
    }
  }
`;

export const DELETE_BLOODCHEM = gql`
  mutation deleteBloodchem($_id: ID!) {
    deleteBloodchem(_id: $_id)
  }
`;

export const UPDATE_BLOODCHEM = gql`
  mutation updateBloodchem($_id: ID!, $input: BloodchemInput!) {
    updateBloodchem(_id: $_id, input: $input) {
      labDate
      glucose
      altSGPT
      astSGOT
      uricAcid
      bun
      cholesterol
      triglycerides
      hdlCholesterol
      aLDL
      vLDL
      creatinine
      eGFR
    }
  }
`;
/////////////////////////////////////


export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    getAppointments{
      _id
      physicianId
      patientName
      appointmentName
      request
      date
      time
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $physicianId: String!
    $appointmentName: String!
    $request: String!
    $patientName: String!
    $date: String!
    $time: String!
  ) {
    addAppointment(
      physicianId: $physicianId
      appointmentName: $appointmentName
      patientName: $patientName
      request: $request
      date: $date
      time: $time
    ) {
      _id
      physicianId
      appointmentName
      patientName
      request
      date
      time
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($_id: ID!) {
    deleteAppointment(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $_id: ID!
    $physicianId: String!
    $appointmentName: String!
    $patientName: String!
    $request: String!
    $date: String!
    $time: String!
  ) {
    updateAppointment(
      _id: $_id
      physicianId: $physicianId
      appointmentName: $appointmentName
      patientName: $patientName
      request: $request
      date: $date
      time: $time
    ) {
      _id
      physicianId
      appointmentName
      request
      date
      time
    }
  }
`;

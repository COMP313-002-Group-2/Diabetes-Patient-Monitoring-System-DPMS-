import { gql } from '@apollo/client';

export const ARTICLES_QUERY = gql`
  {
    articles {
      _id
      title
      content
      image
      source
    }
  }
`;

export const PATIENTS_QUERY = gql`
  {
    getPatients {
      _id
      firstName
      lastName
      email
      userType
      isActive
    }
  }
`;

export const BLOODCHEM_QUERY = gql`
  query GetBloodChemByPatientId($patientId: ID!) {
    getBloodChemByPatientId(patientId: $patientId) {
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

export const BLOODCHEM_QUERY_BY_ID = gql`
  query getBloodChemById($_id: ID!) {
    getBloodChemById(_id: $_id) {
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

export const GET_PATIENT_ID_BY_EMAIL = gql`
  query getPatientId($email: String!) {
    getPatientId(email: $email) {
      _id
    }
  }
`;

export const GET_ONE_REMINDER = gql`
  query GetOneReminder($id: ID!) {
    getOneReminder(id: $id) {
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const getRemindersByPatient = gql`
  query GetRemindersByPatient($patientId: ID!) {
    getRemindersByPatient(patientId: $patientId) {
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const getRemindersByPatientIdAndStatus = gql`
  query GetRemindersByPatientIdAndStatus(
    $patientId: String!
    $status: String!
  ) {
    getRemindersByPatientIdAndStatus(patientId: $patientId, status: $status) {
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const getRemindersByStatus = gql`
  query GetRemindersByStatus($status: String!) {
    getRemindersByStatus(status: $status) {
      _id
      patientId
      reminderName
      reminderDescription
      status
    }
  }
`;

export const USER_QUERY = `
  {
    getUsers {
      _id
      firstName
      lastName
      email
      userType
      isActive
    }
  }
`;

export const USER_BY_ID_QUERY = `
query GetUserById($id: ID!) {
  getUserById(id: $id) {
    _id
    firstName
    lastName
    email
    password
    userType
    isActive
  }
}

`;

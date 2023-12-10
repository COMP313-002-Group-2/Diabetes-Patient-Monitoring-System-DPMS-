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

export const GET_ONE_PATIENT = gql `
  query GetOnePatient($id: ID!) {
    getOnePatient(id: $id){
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

export const GET_ONE_APPOINTMENT = gql`
  query GetOneAppointment($id: ID!) {
    getOneAppointment(id: $id){
      _id
      physicianId
      appointmentName
      request
      patientName
      date
      time
    }
  }
`;

export const getAppointmentsByPhysician = gql `
  query GetAppointmentsByPhysician($physicianId: ID!) {
    getAppointmentsByPhysician(physicianId: $physicianId) {
      _id
      physicianId
      appointmentName
      request
      patientName
      date
      time
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

export const PATIENT_DETAILS_BY_ID_QUERY =gql`
  query GetPatientDetailsById($id: String!) {
    GetPatientDetailsById(id: $id) {
      userId,
      address1,
      address2,
      city,
      phoneNumber,
      postalCode,
      
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

export const PHYSICIANS_QUERY = gql `
  {
    getPhysicians {
      _id
      firstName
      lastName
      email
      userType
      isActive
    }
  }
`;


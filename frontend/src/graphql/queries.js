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

export const GET_ARTICLE_QUERY = gql`
  query GetArticle($_id: ID!) {
    article(_id: $_id) {
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

export const GET_ONE_PATIENT = gql`
  query GetOnePatient($id: ID!) {
    getOnePatient(id: $id) {
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

export const HEMATOLOGY_QUERY = gql`
  query GetHematologyByPatientId($patientId: ID!) {
    getHematologyByPatientId(patientId: $patientId) {
      _id
      patientId
      documentId
      labDate
      hemoglobin
      hematocrit
      rbc
      wbc
      plateletCount
      mcv
      mch
      mchc
      rdw
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
    getOneAppointment(id: $id) {
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

export const getAppointmentsByPhysician = gql`
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


export const GET_PATIENT_ID_BY_EMAIL = gql`
  query getPatientId($email: String!) {
    getPatientId(email: $email) {
      _id
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

export const HEMATOLOGY_QUERY_BY_PATIENT_ID = gql`
  query GetHematologyByPatientId($patientId: ID!) {
    getHematologyByPatientId(patientId: $patientId) {
      _id
      patientId
      documentId
      labDate
      hemoglobin
      hematocrit
      rbc
      wbc
      plateletCount
      mcv
      mch
      mchc
      rdw
    }
  }
  `;

export const HEMATOLOGY_QUERY_BY_ID = gql`
  query GetHematologyById($_id: ID!) {
    getHematologyById(_id: $_id) {
      _id
      patientId
      documentId
      labDate
      hemoglobin
      hematocrit
      rbc
      wbc
      plateletCount
      mcv
      mch
      mchc
      rdw
    }
  }
`;

export const HBA1C_QUERY_BY_PATIENT_ID = gql`
  query GetHbA1cByPatientId($patientId: ID!) {
    getHbA1cByPatientId(patientId: $patientId) {
      _id
      patientId
      documentId
      labDate
      result
    }
  }
`;

export const HBA1C_QUERY_BY_ID = gql`
  query GetHbA1cById($_id: ID!) {
    getHbA1cById(_id: $_id) {
      documentId
      labDate
      result
    }
  }
`;

export const URINALYSIS_QUERY_BY_PATIENT_ID = gql`
  query GetUrinalysisByPatientId($patientId: ID!) {
    getUrinalysisByPatientId(patientId: $patientId) {
      _id
      documentId
      labDate
      color
      transparency
      ph
      specificGravity
      glucose
      protein
      ketones
      nitrites
      leucocytesEsterases
      blood
      bilirubin
      urobilinogen
      rbc
      wbc
    }
  }
`;

export const URINALYSIS_QUERY_BY_ID = gql`
  query GetUrinalysisById($_id: ID!) {
    getUrinalysisById(_id: $_id) {
      labDate
      color
      transparency
      ph
      specificGravity
      glucose
      protein
      ketones
      nitrites
      leucocytesEsterases
      blood
      bilirubin
      urobilinogen
      rbc
      wbc
      documentId
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


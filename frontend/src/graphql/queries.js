import { gql } from '@apollo/client';

export const ARTICLES_QUERY = gql `
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

export const PATIENTS_QUERY = gql `
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
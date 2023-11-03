export const ARTICLES_QUERY = `
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

export const PATIENTS_QUERY = `
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
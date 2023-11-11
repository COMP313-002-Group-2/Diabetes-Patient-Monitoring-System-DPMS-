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


export const USER_QUERY = `
  {
    getUsers {
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

export const USER_BY_ID_QUERY =`
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
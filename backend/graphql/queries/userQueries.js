import { GraphQLID, GraphQLList } from 'graphql';
import { UserType } from '../types/UserType.js';

const userQueries = {
  getUserById: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      // Logic to retrieve user by ID from your data source goes here.
    },
  },
  getUsers: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.find({ userType: 'Physician' });
      // Logic to retrieve all users from your data source goes here.
    },
  },
};



export default userQueries;

import { GraphQLID, GraphQLList } from 'graphql';
import { UserType } from '../types/UserType.js';
import User from '../../models/user.js';

const userQueries = {
  getUserById: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      // Logic to retrieve user by ID from your data source goes here.
      return User.findById(args.id);
    },
  },
  getUsers: {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
      // Logic to retrieve all users from your data source goes here.
      return User.find({});
    },
  },
};

export default userQueries;

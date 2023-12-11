import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { UserType } from '../types/UserType.js';
import User from '../../models/user.js';

const userQueries = {
  getUserById: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      let users = User.findById(args.id);
      return users;
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

  getPatients: {
    type: new GraphQLList(UserType),
    resolve() {
      let patients = User.find({ userType: 'Patient' });
      console.log('GetPatients', patients);
      return patients;
      // Logic to retrieve all patients from your data source goes here.
    },
  },

  getPatientId: {
    type: UserType, // Change to UserType if it's supposed to return a single user
    args: { email: { type: new GraphQLNonNull(GraphQLString) } },
    async resolve(parent, args) {
      try {
        const result = await User.findOne({ email: args.email });
        return result; // Return the single result
      } catch (error) {
        console.error('Error in resolver:', error);
        throw new Error('Error fetching User data by email');
      }
    },
  },
  

  getPhysicians: {
    type: new GraphQLList(UserType),
    resolve() {
      let physicians = User.find({ userType: 'Physician' });
      return physicians;
      // Logic to retrieve all physicians from your data source goes here.
    },
  },

  getStaff: {
    type: new GraphQLList(UserType),
    resolve() {
      let staff = User.find({ userType: 'Staff' });
      console.log('GetStaff', staff);
      return staff;
      // Logic to retrieve all staff from your data source goes here.
    },
  },
  getAdmins: {
    type: new GraphQLList(UserType),
    resolve() {
      let admins = User.find({ userType: 'Admin' });
      console.log('GetAdmins', admins);
      return admins;
      // Logic to retrieve all admins from your data source goes here.
    },
  },
  getActiveUsers: {
    type: new GraphQLList(UserType),
    resolve() {
      let activeUsers = User.find({ isActive: true });
      console.log('GetActiveUsers', activeUsers);
      return activeUsers;
      // Logic to retrieve all active users from your data source goes here.
    },
  },
  getInactiveUsers: {
    type: new GraphQLList(UserType),
    resolve() {
      let inactiveUsers = User.find({ isActive: false });
      console.log('GetInactiveUsers', inactiveUsers);
      return inactiveUsers;
      // Logic to retrieve all inactive users from your data source goes here.
    },
  },
};

export default userQueries;

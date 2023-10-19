import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';
import User from '../../models/user.js';
import { UserType, UserTypeInput, AuthPayload } from '../types/UserType.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//import bcrypt from 'bcryptjs'; //dont forget to npm install bcryptjs
dotenv.config();

const SECRET_KEY = process.env.JWTSECRET;

const userMutations = {
  createUser: {
    type: UserType,
    args: { input: { type: new GraphQLNonNull(UserTypeInput) } },
    async resolve(parent, { input }) {
      // destructured input from args
      const { name, email, password, userType } = input;
      // check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists.');
      }

      // hash password
      // const hashedPassword = await bcrypt.hash(password, 12);

      //no need to hash password for now
      const hashedPassword = password;
      // create user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        userType,
        isActive: userType === 'Patient', // set isActive based on userType
      });

      // save user
      await user.save();

      return user;
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      input: { type: new GraphQLNonNull(UserTypeInput) },
    },
    resolve(parent, args) {
      // Logic to update a user in your data source goes here.
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      // Logic to delete a user from your data source goes here.
    },
  },
  login: {
    type: AuthPayload,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new Error('Invalid email or password.');
      }
  
      if (!user.isActive) {
        throw new Error('Your account is not active. Please contact admin.');
      }
      
      // use bcrypt if possible, change this to bcrypt.compare if hashing password
      if (user.password !== args.password) {
        throw new Error('Invalid email or password.');
      }
      
      // If user is found and password is correct
      const token = jwt.sign(
        { userId: user.id, userType: user.userType },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return {
        token: token,
        userType: user.userType,
      };
    },
  },
};

export default userMutations;

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';
import User from '../../models/user.js';
import {
  UserType,
  UserTypeInput,
  AuthPayload,
  ResetPasswordPayload,
  UserTypeInputByAdmin,
  UserTypeEnum,
} from '../types/UserType.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//import bcrypt from 'bcryptjs'; //dont forget to npm install bcryptjs
import PasswordReset from '../../models/passwordReset.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
dotenv.config();

const SECRET_KEY = process.env.JWTSECRET;
const host = process.env.REMOTEHOST || 'http://localhost:3000';

const userMutations = {
  createUser: {
    type: new GraphQLObjectType({
      name: 'CreateUserPayload',
      fields: {
        user: { type: UserType },
        token: { type: GraphQLString },
        userType: { type: GraphQLString },
        message: { type: GraphQLString },
      },
    }),
    args: { input: { type: new GraphQLNonNull(UserTypeInput) } },
    async resolve(parent, { input }) {
      const { firstName, lastName, email, password, userType } = input;
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
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
        isActive: userType === 'Patient', // set isActive based on userType
      });

      // save user
      await user.save();

      if (userType === 'Patient') {
        // If user is a Patient, generate token and return user, token, and userType
        const token = jwt.sign(
          { userId: user.id, userType: user.userType },
          SECRET_KEY,
          { expiresIn: '1h' }
        );

        return {
          user,
          token,
          userType: user.userType,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        
      } else {
        // If user is not a Patient, return user and a message
        return {
          user,
          message:
            'Account created successfully. Please wait for admin approval.',
        };
      }
    },
  },

  addUserByAdmin: {
    type: new GraphQLObjectType({
      name: 'AddUserPayload',
      fields: {
        user: { type: UserType },
        message: { type: GraphQLString },
      },
    }),
    args: {
      input: { type: new GraphQLNonNull(UserTypeInput) },
    },
    async resolve(parent, { input }, context) {
      const { firstName, lastName, email, userType, password } = input;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('Email already exists.');
      }

      const user = new User({
        firstName,
        lastName,
        email,
        userType,
        isActive: userType === 'Admin', // set isActive based on userType
      });

      if (password) {
        user.password = 'password'; // Set the password if provided
      }

      await user.save();

      return {
        user,
        message: 'User created successfully by admin.',
      };
    },
  },

  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      input: { type: new GraphQLNonNull(UserTypeInput) },
    },
    resolve: async (parent, args) => {
      // Check if the user with the provided ID exists
      const existingUser = await User.findById(args.id);

      if (!existingUser) {
        throw new Error('User not found');
      }

      // Validate and update the user's data based on the input
      existingUser.firstName = args.input.firstName;
      existingUser.lastName = args.input.lastName;
      existingUser.email = args.input.email;

      // Save the updated user to your data source
      await existingUser.save();

      return existingUser;
    },
  },

  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args, context) => {
      try {
        // Check if the user with the provided ID exists and is eligible for deletion
        const userToDelete = await User.findById(args.id);

        if (!userToDelete) {
          throw new Error('User not found.');
        }

        await User.findByIdAndDelete(args.id); // Use 'args.id' instead of 'args._id'

        // Return true to indicate a successful deletion
        return true;
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user.');
      }
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

      /*
      if (!user.isActive) {
        throw new Error('Your account is not active. Please contact admin.');
      }
      */

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
        userid: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    },
  },
  
  requestPasswordReset: {
    type: GraphQLString,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, { email }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found.');
      }

      const token = crypto.randomBytes(20).toString('hex');
      const passwordReset = new PasswordReset({
        userId: user._id,
        token,
      });

      await passwordReset.save();

      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Password Reset',
        text: `Please click on the following link to reset your password: ${host}/reset-password/${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return 'Password reset email sent.';
    },
  },
  resetPassword: {
    type: ResetPasswordPayload,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      newPassword: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, { token, newPassword }) {
      const passwordReset = await PasswordReset.findOne({ token });
      if (!passwordReset) {
        throw new Error('Invalid token.');
      }

      const user = await User.findById(passwordReset.userId);
      if (!user) {
        throw new Error('User not found.');
      }

      // const hashedPassword = await bcrypt.hash(newPassword, 12); // Uncomment if  using bcrypt for password hashing
      const hashedPassword = newPassword; // Comment this if using bcrypt for password hashing

      user.password = hashedPassword;
      await user.save();

      await PasswordReset.deleteOne({ token });

      const newToken = jwt.sign(
        { userId: user.id, userType: user.userType },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      return {
        user,
        token: newToken, // send the new token to the client
        message: 'Password has been reset successfully',
      };
    },
  },
};

export default userMutations;

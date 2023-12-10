import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLBoolean,
} from 'graphql';

const UserTypeEnum = new GraphQLEnumType({
  name: 'UserType',
  values: {
    Patient: { value: 'Patient' },
    Admin: { value: 'Admin' },
    Physician: { value: 'Physician' },
    Staff: { value: 'Staff' },
  },
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    userType: { type: UserTypeEnum },
    isActive: { type: GraphQLBoolean },
  }),
});

const UserTypeAdmin = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    userType: { type: UserTypeEnum },
    isActive: { type: GraphQLBoolean },
  }),
});

const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: () => ({
    token: { type: GraphQLString },
    userType: { type: UserTypeEnum },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const UserTypeInput = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    userType: { type: UserTypeEnum },
  }),
});

const ResetPasswordPayload = new GraphQLObjectType({
  name: 'ResetPasswordPayload',
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

const UserTypeInputByAdmin = new GraphQLInputObjectType({
  name: 'UserTypeInputByAdmin',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString, defaultValue: undefined },
    userType: { type: UserTypeEnum },
  }),
});

export {
  UserType,
  UserTypeInput,
  UserTypeEnum,
  AuthPayload,
  ResetPasswordPayload,
  UserTypeInputByAdmin,
  UserTypeAdmin,
};

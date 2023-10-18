import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
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
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    userType: { type: UserTypeEnum },
  }),
});

const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: () => ({
    token: { type: GraphQLString },
    userType: { type: UserTypeEnum },
  }),
});

const UserTypeInput = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    userType: { type: UserTypeEnum },
  }),
});

export { UserType, UserTypeInput, UserTypeEnum, AuthPayload };

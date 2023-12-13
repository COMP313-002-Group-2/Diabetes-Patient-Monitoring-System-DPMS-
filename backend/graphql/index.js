import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import ArticleQueries from './queries/articleQueries.js';
import userQueries from './queries/userQueries.js';
import userMutations from './mutations/userMutations.js';
import reminderQueries from './queries/reminderQueries.js';
import reminderMutations from './mutations/reminderMutations.js';
import appointmentQueries from './queries/appointmentQueries.js';
import appointmentMutations from './mutations/appointmentMutation.js';
import labQueries from './queries/labQueries.js';
import labMutations from './mutations/labMutations.js';
import patientMutation from './mutations/patientMutation.js';
import PatientQueries from './queries/patientQueries.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...ArticleQueries,
    ...userQueries,
    ...reminderQueries,
    ...appointmentQueries,
    ...labQueries,
    ...PatientQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...reminderMutations,
    ...appointmentMutations,
    ...labMutations,

    // ...put otherMutations here
    ...patientMutation,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

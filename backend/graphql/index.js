import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import ArticleQueries from './queries/articleQueries.js';
import userQueries from './queries/userQueries.js';
import userMutations from './mutations/userMutations.js';
import reminderQueries from './queries/reminderQueries.js';
import reminderMutations from './mutations/reminderMutations.js';
import bloodchemQueries from './queries/bloodchemQueries.js';
import bloodchemMutations from './mutations/bloodchemMutations.js';
import ambulancemutation  from './mutations/ambulanceSchemas.js';
import ambulanceRequestMutation from './mutations/ambulanceRequestSchemas.js';
import ambulanceRequestQueries from './queries/ambulanceRequestQueries.js';
import emergencyRequestMutations from './mutations/emergencyrequestMutation.js';
import emergencyRequestQueries from './queries/emergencyrequestQueries.js';
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
    ...bloodchemQueries,
    ...ambulanceRequestQueries,
    ...emergencyRequestQueries,
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
    ...ambulancemutation,
    ...ambulanceRequestMutation,
    ...bloodchemMutations,
    ...emergencyRequestMutations,
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

import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import ArticleQueries from './queries/articleQueries.js';
import userQueries from './queries/userQueries.js';
import userMutations from './mutations/userMutations.js';
import reminderQueries from './queries/reminderQueries.js';
import reminderMutations from './mutations/reminderMutations.js';
import bloodchemQueries from './queries/bloodchemQueries.js';
import bloodchemMutations from './mutations/bloodchemMutations.js';
import patientMutation from './mutations/patientMutation.js';
import PatientQueries from './queries/patientQueries.js';


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...ArticleQueries,
    ...userQueries,
    ...reminderQueries, 
    ...bloodchemQueries,
    ...PatientQueries
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...reminderMutations,
    ...patientMutation,
   
    ...bloodchemMutations,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

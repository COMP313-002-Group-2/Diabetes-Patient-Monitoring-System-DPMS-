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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...ArticleQueries,
    ...userQueries,
    ...reminderQueries,
    ...bloodchemQueries,
    ...ambulanceRequestQueries,
    ...emergencyRequestQueries
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
    ...emergencyRequestMutations
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import ArticleQueries from './queries/articleQueries.js';
import userQueries from './queries/userQueries.js';
import userMutations from './mutations/userMutations.js';
import reminderQueries from './queries/reminderQueries.js';
import reminderMutations from './mutations/reminderMutations.js';
import appointmentQueries from './queries/appointmentQueries.js';
import appointmentMutations from './mutations/appointmentMutation.js';
import bloodchemQueries from './queries/bloodchemQueries.js';
import bloodchemMutations from './mutations/bloodchemMutations.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...ArticleQueries,
    ...userQueries,
    ...reminderQueries,
    ...appointmentQueries,
    ...bloodchemQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    ...reminderMutations,
    ...appointmentMutations,

    // ...put otherMutations here
    ...bloodchemMutations,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

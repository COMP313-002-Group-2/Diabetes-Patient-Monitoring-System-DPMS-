import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import ArticleQueries from './queries/articleQueries.js';
import userQueries from './queries/userQueries.js';
import userMutations from './mutations/userMutations.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...ArticleQueries,
    ...userQueries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
    // ...put otherMutations here
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

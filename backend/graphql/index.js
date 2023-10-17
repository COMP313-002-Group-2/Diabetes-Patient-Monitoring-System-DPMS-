const { GraphQLSchema } = require('graphql');
const RootQuery = require('./queries/articleQueries');

export default new GraphQLSchema({
  query: RootQuery,
});

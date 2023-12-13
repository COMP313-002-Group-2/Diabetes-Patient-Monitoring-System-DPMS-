import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    image: { type: GraphQLString },
    source: { type: GraphQLString },
  }),
});

const ArticleInputType = new GraphQLInputObjectType({
  name: 'ArticleInput',
  fields: {
    _id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    source: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export { ArticleType, ArticleInputType };

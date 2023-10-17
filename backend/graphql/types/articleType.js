import { GraphQLObjectType, GraphQLString } from 'graphql';

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

export default ArticleType;

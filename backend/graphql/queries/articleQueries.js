import { GraphQLList, GraphQLString } from 'graphql';
import ArticleType from '../types/articleType.js';
import Article from '../../models/article.js';

const ArticleQueries = {
    articles: {
      type: new GraphQLList(ArticleType),
      
      resolve(parent, args) {
        return Article.find({});
      },
    },

    article: {
      type: ArticleType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Article.findById(args.id);
      },
    }
};

export default ArticleQueries;

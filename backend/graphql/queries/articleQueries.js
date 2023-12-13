import { GraphQLList, GraphQLNonNull,GraphQLID } from 'graphql';
import { ArticleType } from '../types/articleType.js';
import Article from '../../models/article.js';

const ArticleQueries = {
  articles: {
    type: new GraphQLList(ArticleType),
    resolve() {
      // Fetch all articles from the database
      return Article.find({});
    },
  },
  article: {
    type: ArticleType,
    args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      // Fetch a single article by its ID
      return Article.findById(args._id);
    },
  },
};

export default ArticleQueries;

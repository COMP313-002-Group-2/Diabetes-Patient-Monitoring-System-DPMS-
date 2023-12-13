import { GraphQLList, GraphQLNonNull,GraphQLID } from 'graphql';
import { ArticleType } from '../types/articleType.js';
import Article from '../../models/article.js';

const ArticleQueries = {
<<<<<<< HEAD
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
=======
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
>>>>>>> 1bb7d3d (complete remaining homepage links)
};

export default ArticleQueries;

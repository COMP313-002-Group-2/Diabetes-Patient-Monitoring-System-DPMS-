import { GraphQLNonNull, GraphQLString } from 'graphql';
import ArticleType from '../types/articleType.js';
import ArticleInputType from '../types/articleInputType.js';
import Article from '../../models/article.js';

const ArticleMutations = {
  addArticle: {
    type: ArticleType,
    args: {
      input: { type: new GraphQLNonNull(ArticleInputType) },
    },
    resolve(parent, { input }) {
      const newArticle = new Article(input);
      return newArticle.save();
    },
  },
  updateArticle: {
    type: ArticleType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      input: { type: new GraphQLNonNull(ArticleInputType) },
    },
    resolve(parent, { id, input }) {
      return Article.findByIdAndUpdate(id, input, { new: true });
    },
  },
  deleteArticle: {
    type: GraphQLString, // Returning the ID of the deleted article
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, { id }) {
      return Article.findByIdAndRemove(id).then((article) => article.id);
    },
  },
};

export default ArticleMutations;

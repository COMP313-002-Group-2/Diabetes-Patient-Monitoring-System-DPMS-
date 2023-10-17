import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { ArticleQueries as RootQuery } from './graphql/queries/articleQueries.js';

import connectDB from './config/db.js'; // Importing the connectDB utility

dotenv.config();

const schema = new GraphQLSchema({
  query: RootQuery,
});

const port = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB using the connectDB utility
connectDB();

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send('API is running with GraphQL...');
});

app.listen(port, () => console.log(`Server running on port ${port}`));

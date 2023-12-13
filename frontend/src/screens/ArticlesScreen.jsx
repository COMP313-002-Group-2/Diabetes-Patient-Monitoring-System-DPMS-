import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_ARTICLE_QUERY } from '../graphql/queries';

const ArticleScreen = () => {

    const { id } = useParams();

  const { loading, error, data } = useQuery(GET_ARTICLE_QUERY, {
    variables: { _id: id },  // Pass 'id' as '_id'
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const article = data?.article;

  return (
    <div>
      {/* Display the article content */}
      {article && (
        <div>
          <h1>{article.title}</h1>
          <img src={article.image} alt={article.title} />
          <p>{article.content}</p>
          <a href={article.source}>Source</a>
        </div>
      )}
    </div>
  );
};

export default ArticleScreen;

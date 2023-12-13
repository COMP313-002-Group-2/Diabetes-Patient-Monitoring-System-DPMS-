import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ARTICLES_QUERY } from '../graphql/queries';

const Articles = () => {
  const { loading, error, data } = useQuery(ARTICLES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Row>
        {data.articles.map((article, index) => (
          <Col key={index} md={4} className='mb-4 d-flex align-items-stretch'>
            <Card className='flex-fill'>
              <Card.Img variant='top' src={article.image} />
              <Card.Body className='d-flex flex-column'>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  {article.content.length > 100
                    ? `${article.content.substring(0, 100)}...`
                    : article.content}
                </Card.Text>
                <a
                  href={article.source}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary mt-auto'
                >
                  Read More
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Articles;

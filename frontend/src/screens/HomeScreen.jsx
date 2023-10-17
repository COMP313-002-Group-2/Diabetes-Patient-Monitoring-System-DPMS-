import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { ARTICLES_QUERY } from '../graphql/queries';

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ARTICLES_QUERY,
        }),
      });

      const responseBody = await response.json();

      if (responseBody.errors) {
        console.error('GraphQL Errors:', responseBody.errors);
        return;
      }

      setArticles(responseBody.data.articles);
    };

    fetchArticles(); // Call the function to fetch the articles
  }, []); // Empty dependency array to run the effect only once

  const truncateText = (text, limit = 21) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const getRandomArticles = (arr, n) => {
    const result = [];
    const usedIndices = new Set(); // to track used indices

    while (result.length < n && result.length !== arr.length) {
      const randomIndex = Math.floor(Math.random() * arr.length);

      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        result.push(arr[randomIndex]);
      }
    }

    return result;
  };

  const truncatedArticles = getRandomArticles(articles, 3);

  return (
    <div>
      <Header />
      <section className='container my-5'>
        <h3>Related Articles</h3>
        <Row>
          {truncatedArticles.map((article, index) => (
            <Col key={index} md={4}>
              <Card className='fixed-card'>
                <Card.Img
                  variant='top'
                  className='fixed-card-img'
                  src={article.image}
                  alt='Card cap'
                />
                <Card.Body>
                  <Card.Text>{truncateText(article.content)}</Card.Text>
                  <Button variant='primary' href={article._id}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default HomeScreen;

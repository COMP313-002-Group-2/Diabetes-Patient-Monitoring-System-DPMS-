import { useQuery } from '@apollo/client';
import Header from '../components/Header';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { ARTICLES_QUERY } from '../graphql/queries';

const HomeScreen = () => {
  const { loading, error, data } = useQuery(ARTICLES_QUERY);

  // If there's an error, handle it appropriately
  if (error) {
    console.error('GraphQL Errors:', error);
    return <div>Error loading articles.</div>;
  }

  // Show a loading message until the query is completed
  if (loading) return <div>Loading...</div>;

  // Extract articles data from the query result
  const articles = data?.articles || [];

  const truncateText = (text, limit = 21) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const getRandomArticles = (arr, n) => {
    const result = new Set();
    while (result.size < n && result.size !== arr.length) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      result.add(arr[randomIndex]);
    }
    return Array.from(result);
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
                  <Button variant='primary' href={`/articles/${article._id}`}>
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

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Login from '../components/Login';

const LoginScreen = () => {
  return (
    <section className='container my-5'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card className='fixed-card'>
            <Card.Body>
              <Card.Title className='text-center'>Login</Card.Title>
              <Login />
              <div className='mt-3 text-center'>
                <a href='/register'>Register</a> |{' '}
                <a href='/acctrecovery'>Forgot Password?</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default LoginScreen;

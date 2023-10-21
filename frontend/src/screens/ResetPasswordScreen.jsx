import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordScreen = () => {
  return (
    <section className='container my-5'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card className='fixed-card'>
            <Card.Body>
              <Card.Title className='text-center'>Reset Password</Card.Title>
              <ResetPassword />
              <div className='mt-3 text-center'>
                <a href='/login'>Login</a> |{' '}
                <a href='/register'>Register</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default ResetPasswordScreen;

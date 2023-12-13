import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success(`Thank you, ${name}. We will contact you soon!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <Container>
      <Row>
        <Col className='text-center'>
          <h1>GET IN TOUCH</h1>
        </Col>
      </Row>

      <Row className='mb-4'>
        <Col md={4} className='text-center'>
          <i className='fa fa-phone' aria-hidden='true'></i>
          <p>+1 (437) 9 9999 99</p>
        </Col>
        <Col md={4} className='text-center'>
          <i className='fa fa-envelope' aria-hidden='true'></i>
          <p>diabeteammailer@gmail.com</p>
        </Col>
        <Col md={4} className='text-center'>
          <i className='fa fa-map-marker' aria-hidden='true'></i>
          <p>941 Progress Ave, Scarborough,. ON M1G 3T8</p>
        </Col>
      </Row>

      <Row className='justify-content-center'>
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='YOUR NAME *'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='email'
                placeholder='YOUR EMAIL *'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='tel'
                placeholder='YOUR PHONE *'
                required
                value={telephone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                as='textarea'
                rows={5}
                placeholder='YOUR MESSAGE *'
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              SEND MESSAGE
            </Button>
          </Form>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default ContactUs;

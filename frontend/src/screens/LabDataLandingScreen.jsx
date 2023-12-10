import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faMicroscope,
  faHeartbeat,
  faTint,
  faToilet,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

const LabDataLandingScreen = () => {
  const navigate = useNavigate();

  const cardInfo = [
    {
      icon: faMicroscope,
      title: 'Blood Chemistry',
      description:
        'View critical health markers like glucose levels, essential in managing diabetes.',
      link: '/bloodchemistry',
    },
    {
      icon: faHeartbeat,
      title: 'HbA1c Overview',
      description:
        'Check your long-term glucose control, a crucial measure in diabetes management.',
      link: '/hba1c',
    },
    {
      icon: faTint,
      title: 'Hematology Report',
      description:
        ' View essential blood cell data, important for diabetes health monitoring.',
      link: '/hematology',
    },
    {
      icon: faToilet,
      title: 'Urinalysis Report',
      description:
        'Click for insights on kidney function and urine analysis, key in diabetes management.',
      link: '/urinalysis',
    },
  ];
  const handleBackClick = () => {
    navigate('/patient');
  };
  const renderCard = (card, index) => {
    return (
      <Col md={4} key={index} className='mb-4'>
        <Card
          className='h-100 text-center shadow'
          onClick={() => navigate(card.link)}
          style={{ cursor: 'pointer' }}
        >
          <Card.Body>
            <FontAwesomeIcon
              icon={card.icon}
              size='3x'
              style={{ color: '#061152' }}
            />
            <Card.Title className='mt-2'>{card.title}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Button
        variant='secondary'
        size='sm'
        className='action-button'
        onClick={handleBackClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Button>
      <Container>
        <Row className='mt-5'>{cardInfo.map(renderCard)}</Row>
      </Container>
    </>
  );
};

export default LabDataLandingScreen;

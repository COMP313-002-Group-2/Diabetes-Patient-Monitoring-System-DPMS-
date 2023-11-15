import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAmbulance,
  faVial,
  faStethoscope,
  faBell,
  faPills,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';

const PatientScreen = () => {
  const cardInfo = [
    {
      icon: faAmbulance,
      title: 'Ambulance Services',
      description: 'Schedule Ambulance Service',
    },
    {
      icon: faVial,
      title: 'Lab Results',
      description: 'View and Manage your lab results',
    },
    {
      icon: faStethoscope,
      title: 'Consultation Services',
      description: 'Consult a Physician',
    },
    {
      icon: faBell,
      title: 'Alerts and Reminders',
      description: 'Detailed Alerts and Messages',
    },
    {
      icon: faPills,
      title: 'Medications',
      description: 'Manage your medications',
    },
    {
      icon: faUserCog,
      title: 'Manage My Account',
      description: 'Modify your account details',
    },
  ];

  const renderCard = (card, index) => {
    return (
      <Col md={4} key={index} className='mb-4'>
        <Card className='h-100 text-center shadow'>
          <Card.Body>
            <FontAwesomeIcon icon={card.icon} size='3x' />
            <Card.Title className='mt-3'>{card.title}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Row className='mt-5'>{cardInfo.map(renderCard)}</Row>
    </Container>
  );
};

export default PatientScreen;

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faAmbulance,
  faVial,
  faStethoscope,
  faBell,
  faPills,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';


const PatientScreen = () => {
  const navigate = useNavigate();
  const cardInfo = [
    {
      icon: faAmbulance,
      title: 'Ambulance Services',
      description: 'Schedule Ambulance Service',
      link: '/ambulance',
    },
    {
      icon: faAmbulance,
      title: 'Patient Details',
      description: 'View Patient Details',
      link: '/patientdetails',
    },
    {
      icon: faVial,
      title: 'Lab Results',
      description: 'View and Manage your lab results',
      link: '/patient/lablandingpage',
    },
    {
      icon: faStethoscope,
      title: 'Consultation Services',
      description: 'Consult a Physician',
      link: '/consultation',
    },
    {
      icon: faBell,
      title: 'Alerts and Reminders',
      description: 'Detailed Alerts and Messages',
      link: '/alertsreminders',
    },
    {
      icon: faPills,
      title: 'Medications',
      description: 'Manage your medications',
      link: '/medications',
    },
    {
      icon: faUserCog,
      title: 'Manage My Account',
      description: 'Modify your account details',
      link: '/accounts',
    },
  ];

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
              style={{ color: '#570909' }}
            />
            <Card.Title className='mt-3'>{card.title}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Container>
        <Row className='mt-5'>{cardInfo.map(renderCard)}</Row>
      </Container>
    </>
  );
};

export default PatientScreen;

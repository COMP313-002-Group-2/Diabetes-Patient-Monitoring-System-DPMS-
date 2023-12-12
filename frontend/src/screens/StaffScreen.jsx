import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faAmbulance,
  faHospital,
  faFirstAid
} from '@fortawesome/free-solid-svg-icons';
function StaffScreen() {
  const navigate = useNavigate();

  const cardInfo = [
    {
      icon:   faHospital,
      title: 'Create Ambulance Request',
      description: 'Schedule Ambulance Service',
      link: '/addambulancerequest',
    },
    {
      icon:   faAmbulance,
      title: 'Add New Ambulance',
      description: 'Register a new ambulance',
      link: '/addambulance',
    },
    {
      icon:   faFirstAid,
      title: 'Ambulance List',
      description: 'Display existing ambulances',
      link: '/ambulancelist',
    },
    {
      icon:   faFirstAid,
      title: 'List of Emergencies',
      description: 'Displaying Critical Emergencies',
      link: '/emergencyrequestlist',
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

export default StaffScreen
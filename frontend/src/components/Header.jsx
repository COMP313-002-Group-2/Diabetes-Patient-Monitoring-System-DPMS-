import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import CardBG from '../assets/1511.jpg';
import HeaderBG from '../assets/bg-5.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVial,
  faStethoscope,
  faAmbulance,
} from '@fortawesome/free-solid-svg-icons';
import headertext from '../headertext';

function Header() {
  const getRandomHeader = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const randomHeader = getRandomHeader(headertext);

  return (
    <header
      className='text-center py-5 header-bg'
      style={{ backgroundImage: `url(${HeaderBG})` }}
    >
      <h1 className='header-title'>{randomHeader.title}</h1>
      <p className='header-subtitle'>{randomHeader.subtitle}</p>
      <div className='container mt-n5'>
        <Row>
          {/* Card: Record Lab Result */}
          <Col md={4}>
            <Card
              className='mb-4 shadow-lg rounded-lg'
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${CardBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Card.Body style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <Card.Title className='text-dark'>
                  <FontAwesomeIcon icon={faVial} style={{ color: 'maroon' }} />
                  &nbsp;&nbsp; Record Lab Result
                </Card.Title>
                <Card.Text className='text-dark'>
                  Easily record and keep track of your lab results in one place.
                </Card.Text>
                <Button
                  variant='outline-dark'
                  className='rounded-pill'
                  href='/login'
                >
                  Start Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card: Book for Physician */}
          <Col md={4}>
            <Card
              className='mb-4 shadow-lg rounded-lg'
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${CardBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Card.Body style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <Card.Title className='text-dark'>
                  <FontAwesomeIcon
                    icon={faStethoscope}
                    style={{ color: 'blue' }}
                  />
                  &nbsp;&nbsp; Book for Physician
                </Card.Title>
                <Card.Text className='text-dark'>
                  Schedule an appointment with your preferred physician at your
                  convenience.
                </Card.Text>
                <Button
                  variant='outline-dark'
                  className='rounded-pill'
                  href='/booking'

                  //href='/login'
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Card: Schedule Ambulance */}
          <Col md={4}>
            <Card
              className='mb-4 shadow-lg rounded-lg'
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${CardBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Card.Body style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <Card.Title className='text-dark'>
                  <FontAwesomeIcon
                    icon={faAmbulance}
                    style={{ color: 'red' }}
                  />
                  &nbsp;&nbsp; Schedule Ambulance
                </Card.Title>
                <Card.Text className='text-dark'>
                  Request an ambulance service in case of emergencies with a
                  single click.
                </Card.Text>
                <Button
                  variant='outline-dark'
                  className='rounded-pill'
                  href='/login'
                >
                  Schedule Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </header>
  );
}

export default Header;

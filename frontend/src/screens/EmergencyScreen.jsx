import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmbulance, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const EmergencyScreen = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleEmergencyClick = () => {
    console.log('Emergency! Description:', description);
    console.log('Location:', location);
  };

  return (
    <div className="container mt-5">
      <h1>Emergency Page</h1>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={getCurrentLocation}>
        <FontAwesomeIcon icon={faAmbulance} className="mr-2" />
        Get Current Location
      </Button>
      {location && (
        <div className="mt-3">
          <p>Location:</p>
          <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
          <p>
            Latitude: {location.lat}, Longitude: {location.lng}
          </p>
        </div>
      )}
      <Button variant="danger" onClick={handleEmergencyClick}>
        <FontAwesomeIcon icon={faAmbulance} className="mr-2" />
        Emergency!
      </Button>
    </div>
  );
};

export default EmergencyScreen;

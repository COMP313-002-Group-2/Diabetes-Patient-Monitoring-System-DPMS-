import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmbulance, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { useMutation, gql } from '@apollo/client';

const ADD_EMERGENCY_REQUEST = gql`
  mutation AddEmergencyRequest(
    $patientId: String!,
    $location: String!,
    $description: String!,
    $email: String!
  ) {
    addEmergencyRequest(
      patientId: $patientId,
      location: $location,
      description: $description,
      email: $email
    ) {
      _id
      // Include any other fields you want to receive in response after adding the emergency request
    }
  }
`;

const EmergencyScreen = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [addEmergencyRequest] = useMutation(ADD_EMERGENCY_REQUEST);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const getGoogleMapsAddress = async (latLng) => {
    const API_KEY = 'AIzaSyCHW3uS5RuUar_K6FZLWMZTPGDETQ_U39c'; 
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };

  const handleEmergencyClick = async () => {
    console.log('Emergency! Description:', description);
    console.log('Location:', location);

    if (location) {
      await getGoogleMapsAddress(location);
      console.log('Address:', address);

      addEmergencyRequest({
        variables: {
          location,
          description,
          email: localStorage.getItem("email") 
        }
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1>Ambulance Request Emergency</h1>
      <Form.Group>
        <br/><br/>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Enter emergency description in short."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <br/>
      <br/>
      <Button variant="primary" onClick={getCurrentLocation}>
        <FontAwesomeIcon icon={faAmbulance} className="mr-2" />
        Get Current Location
      </Button>
      <br/>
      <br/>
      {address && (
        <div className="mt-3">
          <p>Address:</p>
          <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
          <p>{address}</p>
        </div>
      )}
      <Button variant="danger" onClick={handleEmergencyClick}>
        <FontAwesomeIcon icon={faAmbulance} className="mr-2" />
        Submit
      </Button>
    </div>
  );
};

export default EmergencyScreen;

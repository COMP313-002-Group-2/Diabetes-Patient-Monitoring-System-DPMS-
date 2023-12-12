import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmbulance, faMapMarkedAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_EMERGENCY_REQUEST = gql`
  mutation AddEmergencyRequest(
    $location: String!,
    $description: String!,
    $email: String!,
    $status: String!,
    $address: String!
  ) {
    addEmergencyRequest(
      location: $location,
      description: $description,
      email: $email,
      status: $status,
      address: $address
    ) {
      _id
    }
  }
`;

const EmergencyScreen = () => {
  let navigate = useNavigate()
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
          getGoogleMapsAddress(location);
          console.log('Address:', address);

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
    const API_KEY = 'AIzaSyCHW3uS5RuUar_K6FZLWMZTPGDETQ_U39c'; // Replace with your API key
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setAddress(data.results[0].formatted_address);
        const addressField = data.results[0].formatted_address;
        setAddress(addressField);
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
      
      addEmergencyRequest({
        variables: {
          location,
          description,
          email: localStorage.getItem("email"),
          status:'Pending',
          address 
        }
      });

      setSuccessMessage('Your emergency request has been submitted successfully!');
      setTimeout(() => {
        navigate('/');
      }, 10000);
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
      {successMessage && (
        <div className='container my-5'>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-success" size='5em' />
            <Alert variant='success' className="mt-3">
              {successMessage}
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyScreen;

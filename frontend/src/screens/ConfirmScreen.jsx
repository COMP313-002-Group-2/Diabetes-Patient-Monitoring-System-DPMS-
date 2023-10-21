import React from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

const ConfirmScreen = () => {
  const location = useLocation();
  const { message } = location.state || {};

  return (
    <div className='container my-5'>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <FaCheckCircle className="text-success" size='5em' />
        <Alert variant='success' className="mt-3">
          {message || 'Your account has been created successfully!'}
        </Alert>
      </div>
    </div>
  );
};

export default ConfirmScreen;

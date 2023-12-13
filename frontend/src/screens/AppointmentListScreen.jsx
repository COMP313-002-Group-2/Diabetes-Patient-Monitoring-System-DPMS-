import React, { useState } from 'react';
import Cookies from 'js-cookie';
import AppointmentsList from '../components/AppointmentsList';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AppointmentListScreen() {
    
  const navigate = useNavigate();
  //const [showReminders, setShowReminders] = useState(false);
  //const [showAppointments, setShowAppointments] = useState(false);
  const physicianId = Cookies.get('userId');

  //const toggleReminders = () => setShowReminders(prevState => !prevState);
  //const toggleAppointments = () => setShowAppointments(prevState => !prevState);


  const handleBackClick = () => {
    navigate('/physician');
  };

  return (
    <div>
        <h2>Appointments List</h2>
        <Button
          variant='secondary'
          size='sm'
          className='action-button'
          onClick={handleBackClick}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Button>
        

        
          <div className="mt-4">
            <AppointmentsList physicianId={physicianId || ""} />
          </div>
        
    </div>
  );
}

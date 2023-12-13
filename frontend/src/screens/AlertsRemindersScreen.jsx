import React, { useState } from 'react';
import Cookies from 'js-cookie';
import RemindersForPatient from '../components/RemindersForPatients';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AlertsRemindersScreen() {
    
  const navigate = useNavigate();
  const [showReminders, setShowReminders] = useState(false);
  //const [showAppointments, setShowAppointments] = useState(false);
  const patientId = Cookies.get('userId');

  const toggleReminders = () => setShowReminders(prevState => !prevState);
  //const toggleAppointments = () => setShowAppointments(prevState => !prevState);


  const handleBackClick = () => {
    navigate('/patient');
  };

  return (
    <div>
        <h2>Alerts and Reminders Screen</h2>
        <Button
          variant='secondary'
          size='sm'
          className='action-button'
          onClick={handleBackClick}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Button>
        
        {/* Trigger button for showing/hiding reminders */}
        <button type="button" className="btn btn-primary" onClick={toggleReminders}>
          {showReminders ? "Hide Reminders" : "Show Reminders"}
        </button>
        

        {/* Conditionally render the RemindersForPatient component */}
        {showReminders && (
          <div className="mt-4">
            <RemindersForPatient patientId={patientId || ""} />
          </div>
        )}
    </div>
  );
}

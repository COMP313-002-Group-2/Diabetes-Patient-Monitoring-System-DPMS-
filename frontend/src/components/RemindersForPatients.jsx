import React from 'react';
import { useQuery } from '@apollo/client';
import { getRemindersByPatient } from '../graphql/queries';

const RemindersForPatient = ({ patientId }) => {
  // Fetch reminders for the patient using patientId
  const { loading, error, data } = useQuery(getRemindersByPatient, {
    variables: { patientId: patientId },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="row">
      {data && data.getRemindersByPatient.map((reminder) => (
        <div className="col-md-4 mb-3" key={reminder._id}> {/* Adjust column size as needed */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{reminder.reminderName}</h5>
              <p className="card-text">{reminder.reminderDescription}</p>
              <p className="card-text"><small className="text-muted">Status: {reminder.status}</small></p>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default RemindersForPatient;

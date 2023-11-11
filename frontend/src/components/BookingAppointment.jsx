import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
//import { GET_PHYSICIANS } from './physicianQueries';


const BookingAppoinment = () => {
  const navigation = useNavigate();
  const [selectedPhysician, setSelectedPhysician] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');

{/*
  const { loading, error, data } = useQuery(GET_PHYSICIANS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
*/}

  const handleBooking = () => {
    

  };

  return (
    <div className="booking-page">
      <h2>Book an Appointment</h2>
      <label>
        Physician: 
        <select style={{marginLeft: '40px'}} value={selectedPhysician} onChange={(e) => setSelectedPhysician(e.target.value)}>
        <option value="">Select Physician</option>
          
          <option value="">Select Physician</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
        
        </select>
      </label>
      <br/>
      <label>
        Date:
        <input style={{marginLeft: '71px'}} type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </label>
      <br/>
      <label>
        Time:
        <input style={{marginLeft: '70px'}} type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
      </label>
      <br/>
      <label>
        Your Name:
        <input style={{marginLeft: '26px'}} type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
      </label>
      <br/><br/>
      <button onClick={handleBooking}>Book Appointment</button>
    </div>
  );
};

export default BookingAppoinment;

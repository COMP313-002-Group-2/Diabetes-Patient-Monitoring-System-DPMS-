import {React, useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
// import AddReminderModal from '../components/AddReminderModal';
import { PATIENTS_QUERY } from '../graphql/queries';
import ReminderModal from '../components/ReminderModal';
import { useNavigate } from 'react-router-dom';

function PhysicianScreen() {

  //Hooks
  const { loading, error, data} = useQuery(PATIENTS_QUERY);  

  const [reminderModalShow, setReminderModalShow] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState('');

  const [selectedPatientFirstName, setSelectedPatientFirstName] = useState('');
  const [selectedPatientLastName, setSelectedPatientLastName] = useState('');
  const navigate = useNavigate();

  //Use Effects
  useEffect(()=>{
    console.log(data);
  })

  const onPatientClick = (patientId) => {
    const selectedPatient = data.getPatients.find(patient => patient._id === patientId);
    setSelectedPatient(patientId);
    setSelectedPatientFirstName(selectedPatient.firstName);
    setSelectedPatientLastName(selectedPatient.lastName);
    setReminderModalShow(true);
    console.log(`Patient clicked. Patiend Id:${patientId} for ${selectedPatient.firstName} ${selectedPatient.lastName}`);

  }
    
  //Rendering
  if (loading) {
    return "Loading...";
  }
  if (error) {
    return `Error! ${error.message}`;
  }
  
  return (
    <Container>
      <div><h2>Physician Screen</h2></div>
      {/* <AddReminderModal {...reminderModalProps} /> */}
      <hr />

      <button type="button" className="btn btn-primary" onClick={() => navigate("/appointment")}>Appointment List</button>
      <br/><br/>

    <Table striped bordered hover variant="dark" className='text-center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Manage Reminders</th>
          </tr>
        </thead>
        <tbody>
          {data.getPatients.map((patient,index) => { 
            return(
            // <tr key={index} onClick={() => onPatientClick(patient._id, patient.firstName, patient.lastName)}>
            <tr key={index}>
              <td>{patient.firstName} {patient.lastName}</td>
              <td>{patient.email}</td>
              <td>
                <button onClick={() => onPatientClick(patient._id)}>Manage Reminders</button>
            </td>
            </tr>
            
          )}
          )}
        </tbody>
      </Table>
      {reminderModalShow && (
                <ReminderModal
                patientId={selectedPatient}
                firstName={selectedPatientFirstName}
                lastName={selectedPatientLastName}
                onHide={() => setReminderModalShow(false)}
            />
            )}
    </Container>
  )
}

export default PhysicianScreen
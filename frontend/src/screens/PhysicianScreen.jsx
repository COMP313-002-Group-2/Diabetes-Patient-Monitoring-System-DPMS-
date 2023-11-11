import {React, useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import AddReminderModal from '../components/AddReminderModal';
import { PATIENTS_QUERY } from '../graphql/queries';

function PhysicianScreen() {

  //Hooks
  const { loading, error, data} = useQuery(PATIENTS_QUERY);  
  const [reminderModalShow, setReminderModalShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientFirstName, setSelectedPatientFirstName] = useState(null);
  const [selectedPatientLastName, setSelectedPatientLastName] = useState(null);

  //Use Effects
  useEffect(()=>{
    console.log(data);
  })

  //Callback
  const onPatientClick = (patientId, firstName, lastName) => {
    setSelectedPatient(patientId);
    setSelectedPatientFirstName(firstName);
    setSelectedPatientLastName(lastName);
    setReminderModalShow(true);
    console.log(`Patient clicked: ${patientId} ${firstName} ${lastName}`);
  }

  // Setting props for ReminderModal
  const reminderModalProps = {
    show: reminderModalShow,
    onHide: () => setReminderModalShow(false),
    patientId: selectedPatient,
    firstName: selectedPatientFirstName,
    lastName: selectedPatientLastName
};


    
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
      <AddReminderModal {...reminderModalProps} />
      <hr />
    <Table striped bordered hover variant="dark" className='text-center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.getPatients.map((patient,index) => { 
            return(
            <tr key={index} onClick={() => onPatientClick(patient._id, patient.firstName, patient.lastName)}>
              <td>{patient.firstName} {patient.lastName}</td>
              <td>{patient.email}</td>
            </tr>
          )}
          )}
        </tbody>
      </Table>

    </Container>

  )
}

export default PhysicianScreen
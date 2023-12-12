import {React, useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
// import AddReminderModal from '../components/AddReminderModal';
import { PHYSICIANS_QUERY } from '../graphql/queries';
import AppointmentModal from '../components/AppointmentModal';


function AppointmentScreen() {

  //Hooks
  const { loading, error, data} = useQuery(PHYSICIANS_QUERY);  

  const [appointmentModalShow, setAppointmentModalShow] = useState(false);

  const [selectedPhysician, setSelectedPhysician] = useState('');

  const [selectedPhysicianFirstName, setSelectedPhysicianFirstName] = useState('');
  const [selectedPhysicianLastName, setSelectedPhysicianLastName] = useState('');

  //Use Effects
  useEffect(()=>{
    console.log(data);
  })

  const onPhysicianClick = (physicianId) => {
    const selectedPhysician = data.getPhysicians.find(physician => physician._id === physicianId);
    setSelectedPhysician(physicianId);
    setSelectedPhysicianFirstName(selectedPhysician.firstName);
    setSelectedPhysicianLastName(selectedPhysician.lastName);
    setAppointmentModalShow(true);
    console.log(`Physician clicked. Physician Id:${physicianId} for ${selectedPhysician.firstName} ${selectedPhysician.lastName}`);
    


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
      <div><h2>Physician List</h2></div>
      {/* <AddAppointmentModal {...appointmentModalProps} /> */}
      <hr />

    <Table striped bordered hover variant="dark" className='text-center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Book Appointment</th>
          </tr>
        </thead>
        <tbody>
          {data.getPhysicians.map((physician,index) => { 
            return(
            // <tr key={index} onClick={() => onPatientClick(patient._id, patient.firstName, patient.lastName)}>
            <tr key={index}>
              <td>{physician.firstName} {physician.lastName}</td>
              <td>{physician.email}</td>
              <td>
                <button onClick={() => onPhysicianClick(physician._id)}>Book</button>
            </td>
            </tr>
            
          )}
          )}
        </tbody>
      </Table>
      {appointmentModalShow && (
                <AppointmentModal
                physicianId={selectedPhysician}
                firstName={selectedPhysicianFirstName}
                lastName={selectedPhysicianLastName}
                onHide={() => setAppointmentModalShow(false)}
            />
            )}
    </Container>
  )
}

export default AppointmentScreen
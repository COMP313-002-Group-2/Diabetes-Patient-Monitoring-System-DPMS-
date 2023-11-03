import {React, useEffect, useState} from 'react';
import { useQuery, gql } from '@apollo/client';
// import { PATIENTS_QUERY } from '../graphql/queries';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';


const GET_PATIENTS_QUERY = gql`
  {
    getPatients {
      _id
      firstName
      lastName
      email
      userType
      isActive
    }
  }
`;

function PhysicianScreen() {

  //Hooks
  const { loading, error, data} = useQuery(GET_PATIENTS_QUERY);  
  const [reminderModalShow, setReminderModalShow] = useState(false);
  const [selectedPatient] = useState({});
  const navigate = useNavigate();


  //Use Effects
  useEffect(()=>{
    console.log(data);
  })

  //Callback
  const onPatientClick = () => {
    navigate(`/graphql/${reminderModalProps.patientId}`);
  }

  // Setting props for ReminderModal
  const reminderModalProps = {
    show: reminderModalShow,
    onHide: () => setReminderModalShow(false),
    patientId: selectedPatient
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
      <div>Physician Screen</div>
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
            <tr key={index} onClick={() => onPatientClick(patient._id)}>
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
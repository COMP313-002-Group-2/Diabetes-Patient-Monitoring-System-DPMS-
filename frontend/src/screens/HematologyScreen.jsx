import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faEdit,
  faTrashAlt,
  faFileAlt,
  faArrowLeft,
  faPlus,
  faFileUpload,
} from '@fortawesome/free-solid-svg-icons';

const HematologyScreen = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/patient/lablandingpage');
  };

  const renderActionButtons = () => (
    <div className='d-flex justify-content-center'>
      <Button variant='warning' size='sm' className='action-button'>
        <FontAwesomeIcon icon={faEdit} /> Edit
      </Button>
      <Button variant='danger' size='sm' className='action-button'>
        <FontAwesomeIcon icon={faTrashAlt} /> Delete
      </Button>
    </div>
  );

  return (
    <Container>
      <div className='mb-3'>
        <Button
          variant='secondary'
          size='sm'
          className='action-button'
          onClick={handleBackClick}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Button>
        <Button variant='success' size='sm' className='action-button'>
          <FontAwesomeIcon icon={faPlus} /> Add Record
        </Button>
        <Button variant='info' size='sm' className='action-button'>
          <FontAwesomeIcon icon={faFileUpload} /> Upload
        </Button>
      </div>
      <h2 className='text-center my-4'>Hematology Lab Result Overview</h2>
      <Table striped bordered hover className='align-items-center' size="sm" style={{ fontSize: '0.8em' }}>
        <thead>
          <tr>
            <th>Lab Date</th>
            <th>Hemoglobin</th>
            <th>Hematocrit</th>
            <th>RBC</th>
            <th>WBC</th>
            <th>Platelet Count</th>
            <th>MCV</th>
            <th>MCH</th>
            <th>MCHC</th>
            <th>RDW</th>
            <th>View Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamic rows would be inserted here based on data */}
          <tr>
            <td className='text-center wide-column'>2022-12-11</td>
            <td className='text-center'>26.47</td>
            <td className='text-center'>18.86</td>
            <td className='text-center'>9.97</td>
            <td className='text-center'>7.29</td>
            <td className='text-center'>96.95</td>
            <td className='text-center'>169.33</td>
            <td className='text-center'>77.00</td>
            <td className='text-center'>43.69</td>
            <td className='text-center'>111.51</td>

            <td className='text-center'>
              <Button variant='primary' size='sm' >
                <FontAwesomeIcon icon={faFileAlt} /> View
              </Button>
            </td>
            <td>{renderActionButtons()}</td>
          </tr>
          {/* ... More rows ... */}
        </tbody>
      </Table>
    </Container>
  );
};

export default HematologyScreen;

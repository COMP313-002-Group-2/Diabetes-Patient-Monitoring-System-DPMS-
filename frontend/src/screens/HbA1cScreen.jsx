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

const HbA1cScreen = () => {
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
      <h2 className='text-center my-4'>HbA1c Lab Result Overview</h2>
      <Table
        striped
        bordered
        hover
        className='align-items-center'
        style={{ fontSize: '0.8em' }}
      >
        <thead>
          <tr>
            <th className='text-center'>Lab Date</th>
            <th className='text-center'>Result</th>
            <th className='text-center'>View Document</th>
            <th className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamic rows would be inserted here based on data */}
          <tr>
            <td className='text-center wide-column'>2022-12-11</td>
            <td className='text-center'>5.69%</td>

            <td className='text-center medium-column'>
              <Button variant='primary'>
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

export default HbA1cScreen;

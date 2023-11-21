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

const UrinalysisScreen = () => {
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
      <h2 className='text-center my-4'>Urinalysis Lab Result Overview</h2>
      <Table
        striped
        bordered
        hover
        className='align-items-center'
        size='sm'
        style={{ fontSize: '0.8em' }}
      >
        <thead>
          <tr>
            <th>Lab Date</th>
            <th>Color</th>
            <th>Transparency</th>
            <th>pH</th>
            <th>Specific Gravity</th>
            <th>Glucose</th>
            <th>Protein</th>
            <th>Ketones</th>
            <th>Nitrites</th>
            <th>Leucocytes Esterases</th>
            <th>Blood</th>
            <th>Bilirubin</th>
            <th>Urobilinogen</th>
            <th>Crystals</th>
            <th>Casts</th>
            <th>Micral Test</th>
            <th>View Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamic rows would be inserted here based on data */}
          <tr>
            <td className='text-center wide-column'>2022-12-11</td>
            <td className='text-center'>Yellow</td>
            <td className='text-center'>Clear</td>
            <td className='text-center'>6.0</td>
            <td className='text-center'>1.007</td>
            <td className='text-center'>Negative</td>
            <td className='text-center'>Negative</td>
            <td className='text-center'>Negative</td>
            <td className='text-center'>Negative</td>
            <td className='text-center'>Negative</td>
            <td className='text-center'>Negative</td>
            <td className='text-center'>Negative</td>
            <td className='text-center'>Normal</td>
            <td className='text-center'>None Seen</td>
            <td className='text-center'>None Seen</td>
            <td className='text-center'>0 mg/L</td>
            <td className='text-center'>
              <Button variant='primary' size='sm'>
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

export default UrinalysisScreen;

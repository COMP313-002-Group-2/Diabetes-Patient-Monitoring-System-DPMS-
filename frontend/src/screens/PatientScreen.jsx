import React from 'react';
import {Row,Col} from 'react-bootstrap'
import PatientDetails from '../components/PatientDetails';

function PatientScreen() {
  return <div><section className='container my-5'>
    <Row className='justify-content-center'>
      <Col md={6}>
        <PatientDetails/>
      </Col>
    </Row>
  </section></div>;
}

export default PatientScreen;

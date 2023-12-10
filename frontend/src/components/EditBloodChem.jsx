import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_BLOODCHEM } from '../graphql/mutation';
import { BLOODCHEM_QUERY, BLOODCHEM_QUERY_BY_ID } from '../graphql/queries';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditBloodChem = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const patientId = Cookies.get('userId');
  const [documentId, setdocumentId] = useState('');
  const [formValues, setFormValues] = useState({
    labDate: '',
    glucose: '',
    altSGPT: '',
    astSGOT: '',
    uricAcid: '',
    bun: '',
    cholesterol: '',
    triglycerides: '',
    hdlCholesterol: '',
    aLDL: '',
    vLDL: '',
    creatinine: '',
    eGFR: '',
  });
  const [errors, setErrors] = useState({});
  const [updateBloodchem, { loading, error }] = useMutation(UPDATE_BLOODCHEM);

  // Fetch existing record data
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(BLOODCHEM_QUERY_BY_ID, {
    variables: { _id: id },
    skip: !id,
  });

  useEffect(() => {
    if (data && data.getBloodChemById) {
      // Destructure __typename and rest of the data to exclude it from form state
      const { __typename, documentId, labDate, ...formData } =
        data.getBloodChemById;
      const formattedLabDate = new Date(parseInt(labDate))
        .toISOString()
        .split('T')[0];
      setdocumentId(documentId);
      setFormValues({ labDate: formattedLabDate, ...formData });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const isNotEmpty = (value) => {
    // Ensure that value is a string before calling .trim()
    return value !== null && value !== undefined && String(value).trim() !== '';
  };

  const isNumeric = (value) => {
    // Directly check if value is a number without converting to a string
    return !isNaN(value) && value !== null && value !== undefined;
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate each field
    if (!isNotEmpty(formValues.labDate)) {
      newErrors.labDate = 'Lab date is required';
    }
    if (!isNumeric(formValues.glucose)) {
      newErrors.glucose = 'Glucose is required and must be a number';
    }
    if (!isNumeric(formValues.altSGPT)) {
      newErrors.altSGPT = 'ALT/SGPT is required and must be a number';
    }
    if (!isNumeric(formValues.astSGOT)) {
      newErrors.astSGOT = 'ALT/SGOT is required and must be a number';
    }
    if (!isNumeric(formValues.uricAcid)) {
      newErrors.uricAcid = 'Uric Acid is required and must be a number';
    }
    if (!isNumeric(formValues.bun)) {
      newErrors.bun = 'Bun is required and must be a number';
    }
    if (!isNumeric(formValues.cholesterol)) {
      newErrors.cholesterol = 'cholesterol is required and must be a number';
    }
    if (!isNumeric(formValues.triglycerides)) {
      newErrors.triglycerides =
        'triglycerides is required and must be a number';
    }
    if (!isNumeric(formValues.hdlCholesterol)) {
      newErrors.hdlCholesterol =
        'hdlCholesterol is required and must be a number';
    }
    if (!isNumeric(formValues.aLDL)) {
      newErrors.aLDL = 'aLDL is required and must be a number';
    }
    if (!isNumeric(formValues.vLDL)) {
      newErrors.vLDL = 'vLDL is required and must be a number';
    }
    if (!isNumeric(formValues.creatinine)) {
      newErrors.creatinine = 'creatinine is required and must be a number';
    }
    if (!isNumeric(formValues.eGFR)) {
      newErrors.eGFR = 'eGFR is required and must be a number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBackClick = () => {
    navigate('/patient/lablandingpage');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Convert numeric string values to numbers
    const parsedValues = {
      ...formValues,
      glucose: parseFloat(formValues.glucose),
      altSGPT: parseFloat(formValues.altSGPT),
      astSGOT: parseFloat(formValues.astSGOT),
      uricAcid: parseFloat(formValues.uricAcid),
      bun: parseFloat(formValues.bun),
      cholesterol: parseFloat(formValues.cholesterol),
      triglycerides: parseFloat(formValues.triglycerides),
      hdlCholesterol: parseFloat(formValues.hdlCholesterol),
      aLDL: parseFloat(formValues.aLDL),
      vLDL: parseFloat(formValues.vLDL),
      creatinine: parseFloat(formValues.creatinine),
      eGFR: parseFloat(formValues.eGFR),
    };

    try {
      const response = await updateBloodchem({
        variables: {
          _id: id,
          input: { ...parsedValues, patientId, documentId },
        },
        refetchQueries: [{ query: BLOODCHEM_QUERY, variables: { patientId } }],
      });
      if (response.data) {
        navigate('/bloodchemistry');
      }
    } catch (err) {
      console.error(err);
      // handle errors
    }
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError || error) return <p>Error :( Please try again</p>;

  return (
    <section className='container my-9'>
      <Button
        variant='secondary'
        size='sm'
        className='action-button'
        onClick={handleBackClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Button>
      <Row className='justify-content-center'>
        <Col md={9} lg={7}>
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>
                Add Blood Chemistry Lab Data
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                {Object.entries(formValues)
                  .filter(([key]) => key !== '__typename') // Exclude __typename from the entries
                  .map(([key, value]) => (
                    <Form.Group as={Row} className='mb-3' key={key}>
                      <Form.Label column sm={3} className='text-sm-end'>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          className='half-width-input'
                          type={key === 'labDate' ? 'date' : 'text'}
                          name={key}
                          value={value}
                          onChange={handleInputChange}
                          isInvalid={!!errors[key]}
                        />
                        {errors[key] && (
                          <div className='invalid-feedback d-block'>
                            {errors[key]}
                          </div>
                        )}
                      </Col>
                    </Form.Group>
                  ))}

                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column sm={3} className='text-sm-end'>
                    Proof of Lab
                  </Form.Label>
                  <Col sm={9}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUpload} />
                      </InputGroup.Text>
                      <Form.Control type='file' className='half-width-input' />
                    </InputGroup>
                    {errors.document && (
                      <div className='invalid-feedback d-block'>
                        {errors.document}
                      </div>
                    )}
                  </Col>
                </Form.Group>
                <Row>
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button variant='primary' type='submit'>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default EditBloodChem;

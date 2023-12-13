import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { ADD_BLOODCHEM } from '../graphql/mutation';
import { BLOODCHEM_QUERY } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';

const AddBloodChem = () => {
  const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.REACT_APP_AWS_REGION;
  const awsBucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
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
  const [addBloodchem, { loading, error }] = useMutation(ADD_BLOODCHEM);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const patientId = Cookies.get('userId');
  const [errors, setErrors] = useState({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleCancelClick = () => {
    navigate('/bloodchemistry');
  };
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const isNotEmpty = (value) => value.trim() !== '';
  const isNumeric = (value) => !isNaN(value) && isNotEmpty(value);

  const validateForm = () => {
    const newErrors = {};

    //================ Field validations ================
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

  //================ Upload to S3 Start ================
  const uploadFileToS3 = async (file) => {
    AWS.config.update({
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey,
      region: awsRegion,
    });

    const s3 = new AWS.S3();

    const fileKey = `${uuidv4()}-${file.name}`;
    const uploadParams = {
      Bucket: awsBucketName,
      Key: fileKey,
      Body: file,
    };

    try {
      const data = await s3.upload(uploadParams).promise();
      console.log('File uploaded successfully at', data.Location);
      console.log('File uploaded successfully at key:', fileKey);
      return fileKey; //  Returns the key of the uploaded file
    } catch (err) {
      console.error('There was an error uploading your file: ', err.message);
      throw err;
    }
  };
  //================ Upload to S3 End ================
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform validation and show errors if any
    if (!validateForm()) {
      return;
    }

    let fileKey = null;
    if (selectedFile) {
      try {
        fileKey = await uploadFileToS3(selectedFile);
        console.log('S3 File Key:', fileKey);
      } catch (err) {
        console.error('Error uploading file to S3:', err);
        return; // Stop the form submission if file upload fails
      }
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
      documentId: fileKey,
    };

    // If valid, send data to backend
    try {
      const response = await addBloodchem({
        variables: {
          input: { ...parsedValues, patientId },
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

  return (
    <section className='container my-9'>
      <Row className='justify-content-center'>
        <Col md={9} lg={7}>
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>
                Add Blood Chemistry Lab Data
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                {Object.entries(formValues).map(([key, value]) => (
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
                      <Form.Control
                        type='file'
                        className='half-width-input'
                        onChange={handleFileInput}
                      />
                    </InputGroup>
                    {errors.document && (
                      <div className='invalid-feedback d-block'>
                        {errors.document}
                      </div>
                    )}
                  </Col>
                </Form.Group>
                <Row>
                  <Col
                    sm={{ span: 3, offset: 3 }}
                    className='d-flex justify-content-between'
                  >
                    <Button variant='primary' type='submit'>
                      Save
                    </Button>
                    <Button variant='secondary' onClick={handleCancelClick}>
                      Cancel
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

export default AddBloodChem;

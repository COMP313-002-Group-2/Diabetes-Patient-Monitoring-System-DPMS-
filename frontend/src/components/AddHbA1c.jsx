import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { ADD_HBA1C } from '../graphql/mutation'; // Ensure this is the correct mutation for adding hematology
import { HBA1C_QUERY_BY_PATIENT_ID } from '../graphql/queries'; // Ensure this is the correct query
import { useNavigate } from 'react-router-dom';

const AddHbA1c = () => {
  const [addhba1c, { loading, error }] = useMutation(ADD_HBA1C);
  const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.REACT_APP_AWS_REGION;
  const awsBucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
  const [formValues, setFormValues] = useState({
    labDate: '',
    result: '',
  });
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
    navigate('/hba1c');
  };
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  //======= Form Validation =======//

  const isNumeric = (value) => {
    // Directly check if value is a number without converting to a string
    return !isNaN(value) && value !== null && value !== undefined;
  };

  const isNotEmpty = (value) => {
    // Ensure that value is a string before calling .trim()
    return value !== null && value !== undefined && String(value).trim() !== '';
  };
  // const isNumeric = (value) => !isNaN(value) && isNotEmpty(value); //required

  const validateForm = () => {
    const newErrors = {};

    //================ Field validations ================
    if (!isNotEmpty(formValues.labDate)) {
      newErrors.labDate = 'Lab date is required';
    }
    //fields are optional
    if (!isNumeric(formValues.result)) {
      newErrors.result = 'Result must be a number';
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
      result: parseFloat(formValues.result || 0),
      documentId: fileKey,
    };

    // If valid, send data to backend
    try {
      const response = await addhba1c({
        variables: {
          input: { ...parsedValues, patientId },
        },
        refetchQueries: [
          { query: HBA1C_QUERY_BY_PATIENT_ID, variables: { patientId } },
        ],
      });
      if (response.data) {
        navigate('/hba1c');
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
                Add HbA1c Lab Data
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
                    sm={{ span: 3, offset: 4 }}
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

export default AddHbA1c;

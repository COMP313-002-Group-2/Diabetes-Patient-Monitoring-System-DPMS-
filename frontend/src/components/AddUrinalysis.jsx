import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { ADD_URINALYSIS } from '../graphql/mutation'; // Ensure this is the correct mutation for adding hematology
import { URINALYSIS_QUERY_BY_PATIENT_ID } from '../graphql/queries'; // Ensure this is the correct query
import { useNavigate } from 'react-router-dom';

const AddUrinalysis = () => {
  const [addUrinalysis, { loading, error }] = useMutation(ADD_URINALYSIS);
  const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.REACT_APP_AWS_REGION;
  const awsBucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
  const [formValues, setFormValues] = useState({
    labDate: '',
    color: '',
    transparency: '',
    ph: '',
    specificGravity: '',
    glucose: '',
    protein: '',
    ketones: '',
    nitrites: '',
    leucocytesEsterases: '',
    blood: '',
    bilirubin: '',
    urobilinogen: '',
    rbc: '',
    wbc: '',
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  // state for file upload error
  const [fileError, setFileError] = useState('');
  const navigate = useNavigate();
  const patientId = Cookies.get('userId');
  const [errors, setErrors] = useState({});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const colorOptions = ['Yellow', 'Pale Yellow', 'Dark Yellow', 'Amber', 'Brown', 'Red', 'Green', 'Orange', 'Blue'];
  const transparencyOptions = ['Clear', 'Hazy', 'Cloudy', 'Turbid'];
  const resultOptions = ['Negative', 'Positive'];
  const abnormalityOption = ['Normal', 'Abnormal', 'Undetermined', 'Critical'];

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileError(''); // Clear any existing file error
  };
  const handleCancelClick = () => {
    navigate('/urinalysis');
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
    if (!isNotEmpty(formValues.color)) {
      newErrors.color = 'Color value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.transparency)) {
      newErrors.transparency = 'Transparency value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.glucose)) {
      newErrors.glucose = 'Glucose value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.protein)) {
      newErrors.protein = 'Protein value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.ketones)) {
      newErrors.ketones = 'Ketones value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.nitrites)) {
      newErrors.nitrites = 'Nitrites value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.leucocytesEsterases)) {
      newErrors.leucocytesEsterases = 'Leucocytes Esterases value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.blood)) {
      newErrors.blood = 'Blood value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.bilirubin)) {
      newErrors.bilirubin = 'Bilirubin value is required. Choose from the dropdown';
    }
    if (!isNotEmpty(formValues.urobilinogen)) {
      newErrors.urobilinogen = 'Urobilinogen value is required. Choose from the dropdown';
    }
    // Validate file upload
    if (!selectedFile) {
      setFileError('Proof of laboratory result required.');
      return false;
    }
    //fields are optional
    if (!isNumeric(formValues.specificGravity)) {
      newErrors.specificGravity = 'SpecificGravity must be a number';
    }
    if (!isNumeric(formValues.rbc)) {
      newErrors.rbc = 'RBC must be a number';
    }
    if (!isNumeric(formValues.wbc)) {
      newErrors.wbc = 'WBC must be a number';
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
      specificGravity: parseFloat(formValues.specificGravity || 0),
      ph: parseFloat(formValues.ph || 0),
      rbc: parseFloat(formValues.rbc || 0),
      wbc: parseFloat(formValues.wbc || 0),
      documentId: fileKey,
    };

    // If valid, send data to backend
    try {
      const response = await addUrinalysis({
        variables: {
          input: { ...parsedValues, patientId },
        },
        refetchQueries: [
          { query: URINALYSIS_QUERY_BY_PATIENT_ID, variables: { patientId } },
        ],
      });
      if (response.data) {
        navigate('/urinalysis');
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
                Add Urinalysis Lab Data
              </Card.Title>
              <Form onSubmit={handleSubmit}>
              {Object.entries(formValues).map(([key, value]) => {
                  if (key === 'color') {
                    return (
                      <Form.Group as={Row} className='mb-3' key={key}>
                        <Form.Label column sm={3} className='text-sm-end'>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Select
                            name='color'
                            value={value}
                            onChange={handleInputChange}
                            isInvalid={!!errors[key]}
                          >
                            <option value=''>Select Color</option>
                            {colorOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                          {errors[key] && (
                            <div className='invalid-feedback d-block'>
                              {errors[key]}
                            </div>
                          )}
                        </Col>
                      </Form.Group>
                    );
                  } else if (key === 'transparency') {
                    return (
                      <Form.Group as={Row} className='mb-3' key={key}>
                        <Form.Label column sm={3} className='text-sm-end'>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Select
                            name='transparency'
                            value={value}
                            onChange={handleInputChange}
                            isInvalid={!!errors[key]}
                          >
                            <option value=''>Select Transparency</option>
                            {transparencyOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                          {errors[key] && (
                            <div className='invalid-feedback d-block'>
                              {errors[key]}
                            </div>
                          )}
                        </Col>
                      </Form.Group>
                    );
                  } else if (['glucose', 'protein', 'ketones', 'nitrites', 'leucocytesEsterases', 'blood', 'bilirubin'].includes(key)) {
                    return (
                      <Form.Group as={Row} className='mb-3' key={key}>
                        <Form.Label column sm={3} className='text-sm-end'>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Select
                            name={key}
                            value={value}
                            onChange={handleInputChange}
                            isInvalid={!!errors[key]}
                          >
                            <option value=''>Select Result</option>
                            {resultOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                          {errors[key] && (
                            <div className='invalid-feedback d-block'>
                              {errors[key]}
                            </div>
                          )}
                        </Col>
                      </Form.Group>
                    );
                  } else if (key === 'urobilinogen') {
                    return (
                      <Form.Group as={Row} className='mb-3' key={key}>
                        <Form.Label column sm={3} className='text-sm-end'>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Select
                            name='urobilinogen'
                            value={value}
                            onChange={handleInputChange}
                            isInvalid={!!errors[key]}
                          >
                            <option value=''>Select Urobilinogen Value</option>
                            {abnormalityOption.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                          {errors[key] && (
                            <div className='invalid-feedback d-block'>
                              {errors[key]}
                            </div>
                          )}
                        </Col>
                      </Form.Group>
                    );
                  } else {
                    return (
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
                    );
                  }
                })}

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
                    {fileError && (
                      <div className='invalid-feedback d-block'>
                        {fileError}
                      </div>
                    )}
                  </Col>
                </Form.Group>
                { /**----------End of Form------------**/ }
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

export default AddUrinalysis;

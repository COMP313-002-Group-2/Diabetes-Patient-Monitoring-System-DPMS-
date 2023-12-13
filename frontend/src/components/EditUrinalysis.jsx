import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_URINALYSIS } from '../graphql/mutation';
import {
  URINALYSIS_QUERY_BY_PATIENT_ID,
  URINALYSIS_QUERY_BY_ID,
} from '../graphql/queries';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUrinalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patientId = Cookies.get('userId');
  const [selectedFile, setSelectedFile] = useState(null);
  const [oldDocumentId, setOldDocumentId] = useState('');
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

  const [errors, setErrors] = useState({});
  const [updateUrinalysis, { error }] = useMutation(UPDATE_URINALYSIS);

  const {
    data,
    loading: queryLoading,
    error: queryError,
    refetch,
  } = useQuery(URINALYSIS_QUERY_BY_ID, {
    variables: { _id: id },
    skip: !id,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  useEffect(() => {
    if (data && data.getUrinalysisById) {
      const { __typename, documentId, labDate, ...formData } =
        data.getUrinalysisById;
      const formattedLabDate = new Date(parseInt(labDate))
        .toISOString()
        .split('T')[0];
      setOldDocumentId(documentId);
      setFormValues({ labDate: formattedLabDate, ...formData });
    }
  }, [data]);

  if (error) return <p>Error :( Please try again</p>;

  const transparencyOptions = ['Clear', 'Hazy', 'Cloudy', 'Turbid'];
  const resultOptions = ['Negative', 'Positive'];
  const abnormalityOption = ['Normal', 'Abnormal', 'Undetermined', 'Critical'];

  const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.REACT_APP_AWS_REGION;
  const awsBucketName = process.env.REACT_APP_AWS_BUCKET_NAME;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
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

  const validateForm = () => {
    const newErrors = {};
    //================ Field validations ================
    if (!isNotEmpty(formValues.labDate)) {
      newErrors.labDate = 'Lab date is required';
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
  //================================//
  const handleBackClick = () => {
    navigate('/urinalysis');
  };

  const deleteOldFileFromS3 = async (newDocumentId) => {
    if (!oldDocumentId || oldDocumentId === newDocumentId) return;

    const s3 = new AWS.S3({
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey,
      region: awsRegion,
    });

    const deleteParams = {
      Bucket: awsBucketName,
      Key: oldDocumentId,
    };

    try {
      await s3.deleteObject(deleteParams).promise();
      console.log('Old file deleted successfully');
    } catch (err) {
      console.error('There was an error deleting the old file: ', err.message);
    }
  };

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
      return fileKey;
    } catch (err) {
      console.error('There was an error uploading your file: ', err.message);
      toast.error('There was an error uploading your file.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      throw err;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    let newDocumentId = oldDocumentId;
    if (selectedFile) {
      newDocumentId = await uploadFileToS3(selectedFile);
      await deleteOldFileFromS3(newDocumentId);
    }

    const parsedValues = {
      ...formValues,
      specificGravity: parseFloat(formValues.specificGravity || 0),
      ph: parseFloat(formValues.ph || 0),
      rbc: parseFloat(formValues.rbc || 0),
      wbc: parseFloat(formValues.wbc || 0),
    };

    try {
      const response = await updateUrinalysis({
        variables: {
          _id: id,
          input: { ...parsedValues, patientId, documentId: newDocumentId },
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
      toast.error('Error occurred updating the record.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
                Edit Urinalysis Lab Result Data
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                {Object.entries(formValues)
                  .filter(([key]) => key !== '__typename') // Exclude __typename from the entries
                  .map(([key, value]) => {
                    //--------- 'color' dropdown Start--------
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
                              isInvalid={!!errors.color}
                            >
                              <option value=''>Select Color</option>
                              <option value='Clear'>Clear</option>
                              <option value='Pale Yellow'>Pale Yellow</option>
                              <option value='Yellow'>Yellow</option>
                              <option value='Dark Yellow'>Dark Yellow</option>
                              <option value='Amber'>Amber</option>
                              <option value='Brown'>Brown</option>
                              <option value='Red'>Red</option>
                              <option value='Green'>Green</option>
                              <option value='Orange'>Orange</option>
                              <option value='Blue'>Blue</option>
                            </Form.Select>
                            {errors.color && (
                              <div className='invalid-feedback d-block'>
                                {errors.color}
                              </div>
                            )}
                          </Col>
                        </Form.Group>
                      );
                    } //--------- 'color' dropdown end--------
                    //--------- 'transparency' dropdown Start--------
                    else if (key === 'transparency') {
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
                              isInvalid={!!errors.transparency}
                            >
                              <option value=''>Select Transparency</option>
                              {transparencyOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Form.Select>
                            {errors.transparency && (
                              <div className='invalid-feedback d-block'>
                                {errors.transparency}
                              </div>
                            )}
                          </Col>
                        </Form.Group>
                      );
                    }
                    //--------- 'transparency' dropdown end--------
                    //--------- 'resultOptions' dropdown Start--------
                    else if (
                      [
                        'glucose',
                        'protein',
                        'ketones',
                        'nitrites',
                        'leucocytesEsterases',
                        'blood',
                        'bilirubin',
                      ].includes(key)
                    ) {
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
                              {resultOptions.map((option) => (
                                <option key={option} value={option}>
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
                    }
                    //--------- 'resultOptions' dropdown end--------
                    //--------- 'abnormality' dropdown Start--------
                    else if (key === 'urobilinogen') {
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
                              isInvalid={!!errors.urobilinogen}
                            >
                              <option value=''>
                                Select Urobilinogen Value
                              </option>
                              {abnormalityOption.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Form.Select>
                            {errors.urobilinogen && (
                              <div className='invalid-feedback d-block'>
                                {errors.transparency}
                              </div>
                            )}
                          </Col>
                        </Form.Group>
                      );
                    }
                    //--------- 'abnormality' dropdown end--------
                    else {
                      // For all other fields
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

                {/* File input group */}
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
                    {oldDocumentId && <p className='mt-2'>{oldDocumentId}</p>}
                  </Col>
                </Form.Group>

                {/* Submit and Cancel buttons */}
                <Row>
                  <Col
                    sm={{ span: 3, offset: 4 }}
                    className='d-flex justify-content-between'
                  >
                    <Button variant='primary' type='submit'>
                      Save
                    </Button>
                    <Button variant='secondary' onClick={handleBackClick}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </section>
  );
};

export default EditUrinalysis;

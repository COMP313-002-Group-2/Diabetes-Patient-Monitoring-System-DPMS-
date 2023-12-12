import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_HBA1C } from '../graphql/mutation';
import {
  HBA1C_QUERY_BY_PATIENT_ID,
  HBA1C_QUERY_BY_ID,
} from '../graphql/queries';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditHbA1c = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patientId = Cookies.get('userId');
  const [selectedFile, setSelectedFile] = useState(null);
  const [oldDocumentId, setOldDocumentId] = useState('');
  const [formValues, setFormValues] = useState({
    labDate: '',
    result: '',
  });
  const [errors, setErrors] = useState({});
  const [updateHbA1c, { error }] = useMutation(UPDATE_HBA1C);
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(HBA1C_QUERY_BY_ID, {
    variables: { _id: id },
    skip: !id,
  });

  const awsAccessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  const awsRegion = process.env.REACT_APP_AWS_REGION;
  const awsBucketName = process.env.REACT_APP_AWS_BUCKET_NAME;

  useEffect(() => {
    if (data && data.getHbA1cById) {
      const { __typename, documentId, labDate, ...formData } =
        data.getHbA1cById;
      const formattedLabDate = new Date(parseInt(labDate))
        .toISOString()
        .split('T')[0];
      setOldDocumentId(documentId);
      setFormValues({ labDate: formattedLabDate, ...formData });
    }
  }, [data]);

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
    // Validate each field
    if (!isNotEmpty(formValues.labDate)) {
      newErrors.labDate = 'Lab date is required';
    }
    if (!isNumeric(formValues.result)) {
      newErrors.result = 'Result must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //================================//
  const handleBackClick = () => {
    navigate('/hba1c');
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
      result: parseFloat(formValues.result || 0),
    };

    try {
      const response = await updateHbA1c({
        variables: {
          _id: id,
          input: { ...parsedValues, patientId, documentId: newDocumentId },
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
                Edit HbA1c Lab Result Data
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
                <Row>
                  <Col
                    sm={{ span: 3, offset: 5 }}
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

export default EditHbA1c;

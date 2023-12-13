import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AWS from 'aws-sdk';
import {
  faEdit,
  faTrashAlt,
  faFileAlt,
  faArrowLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { HEMATOLOGY_QUERY_BY_PATIENT_ID } from '../graphql/queries';
import { DELETE_HEMATOLOGY } from '../graphql/mutation';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HematologyScreen = () => {
  const navigate = useNavigate();
  const patientId = Cookies.get('userId');
  const [deleteHematology] = useMutation(DELETE_HEMATOLOGY, {
    refetchQueries: [
      { query: HEMATOLOGY_QUERY_BY_PATIENT_ID, variables: { patientId } },
    ],
  });

  // Initialize AWS S3
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
  });
  const s3 = new AWS.S3();

  const getS3FileUrl = (documentId) => {
    const s3BucketUrl = process.env.REACT_APP_AWS_BUCKET_URL;
    return `${s3BucketUrl}${documentId}`;
  };

  const {
    loading: hematologyLoading,
    error: hematologyError,
    data: hematologyData,
  } = useQuery(HEMATOLOGY_QUERY_BY_PATIENT_ID, {
    variables: { patientId },
    skip: !patientId,
  });

  if (hematologyError) {
    console.error('Error loading hematology data:', hematologyError);
    return <div>Error loading hematology data.</div>;
  }

  if (hematologyLoading) return <div>Loading...</div>;

  const hematologyDataList = hematologyData?.getHematologyByPatientId || [];

  //Format the date
  const formatDate = (timestamp) => {
    if (!timestamp || isNaN(Number(timestamp))) {
      return 'Invalid date';
    }
    return format(new Date(Number(timestamp)), 'yyyy-MM-dd');
  };

  const handleBackClick = () => {
    navigate('/patient/lablandingpage');
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      try {
        const recordToDelete = hematologyDataList.find(
          (record) => record._id === _id
        );
        if (recordToDelete && recordToDelete.documentId) {
          const deleteParams = {
            Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
            Key: recordToDelete.documentId,
          };

          s3.deleteObject(deleteParams, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log('File deleted from S3:', data);
          });
        }

        await deleteHematology({ variables: { _id } });
        toast.success('Record successfully deleted!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error('Error deleting hematology data', error);
        toast.error('Error occurred while deleting the record.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };


  const renderDocumentColumn = (record) => (
    <td className='text-center'>
      <Button
        variant='primary'
        size='sm'
        onClick={() => {
          const fileUrl = getS3FileUrl(record.documentId);
          window.open(fileUrl, '_blank');
        }}
      >
        <FontAwesomeIcon icon={faFileAlt} /> View
      </Button>
    </td>
  );

  const renderActionButtons = (id) => (
    <div className='d-flex justify-content-center'>
      <Button
        variant='warning'
        size='sm'
        className='action-button'
        onClick={() => navigate(`/edithematology/${id}`)}
      >
        <FontAwesomeIcon icon={faEdit} /> Edit
      </Button>
      <Button
        variant='danger'
        size='sm'
        className='action-button'
        onClick={() => handleDelete(id)}
      >
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
        <Button
          variant='success'
          size='sm'
          className='action-button'
          onClick={() => navigate('/addhematology')}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Record
        </Button>
        
      </div>
      <h2 className='text-center my-4'>Hematology Lab Result Overview</h2>
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
          {hematologyDataList.map((record) => (
            <tr key={record._id}>
              <td className='text-center'>{formatDate(record.labDate)}</td>
              <td className='text-center'>{record.hemoglobin}</td>
              <td className='text-center'>{record.hematocrit}</td>
              <td className='text-center'>{record.rbc}</td>
              <td className='text-center'>{record.wbc}</td>
              <td className='text-center'>{record.plateletCount}</td>
              <td className='text-center'>{record.mcv}</td>
              <td className='text-center'>{record.mch}</td>
              <td className='text-center'>{record.mchc}</td>
              <td className='text-center'>{record.rdw}</td>
              {renderDocumentColumn(record)}
              <td>{renderActionButtons(record._id)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default HematologyScreen;

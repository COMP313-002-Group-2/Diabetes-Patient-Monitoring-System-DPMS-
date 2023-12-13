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
import { URINALYSIS_QUERY_BY_PATIENT_ID } from '../graphql/queries';
import { DELETE_URINALYSIS } from '../graphql/mutation';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UrinalysisScreen = () => {
  const navigate = useNavigate();
  const patientId = Cookies.get('userId');
  const [deleteurinalysis] = useMutation(DELETE_URINALYSIS, {
    refetchQueries: [
      { query: URINALYSIS_QUERY_BY_PATIENT_ID, variables: { patientId } },
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
    loading: urinalysisLoading,
    error: urinalysisError,
    data: urinalysisData,
  } = useQuery(URINALYSIS_QUERY_BY_PATIENT_ID, {
    variables: { patientId },
    skip: !patientId,
  });

  if (urinalysisError) {
    console.error('Error loading urinalysis data:', urinalysisError);
    return <div>Error loading urinalysis data.</div>;
  }

  if (urinalysisLoading) return <div>Loading...</div>;

  const urinalysisDataList = urinalysisData?.getUrinalysisByPatientId || [];

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
        const recordToDelete = urinalysisDataList.find(
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

        await deleteurinalysis({ variables: { _id } });
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
        onClick={() => navigate(`/editurinalysis/${id}`)}
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
    <Container fluid>
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
          onClick={() => navigate('/addurinalysis')}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Record
        </Button>
      </div>
      <h2 className='text-center my-4'>Urinalysis Lab Result Overview</h2>
      <Table
        striped
        bordered
        hover
        className='align-items-center urinalysis-table'
        size='sm'
        style={{ fontSize: '0.7em' }}
      >
        <thead>
          <tr>
            <th>Lab Date</th>
            <th>Color</th>
            <th>Transparency</th>
            <th>pH</th>
            <th>Gravity</th>
            <th>Glucose</th>
            <th>Protein</th>
            <th>Ketones</th>
            <th>Nitrites</th>
            <th>Leucocytes</th>
            <th>Blood</th>
            <th>Bilirubin</th>
            <th>Urobilinogen</th>
            <th>RBC</th>
            <th>WBC</th>
            <th>View Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urinalysisDataList.map((record) => (
            <tr key={record._id}>
              <td className='text-center'>{formatDate(record.labDate)}</td>
              <td className='text-center'>{record.color}</td>
              <td className='text-center'>{record.transparency}</td>
              <td className='text-center'>{record.ph}</td>
              <td className='text-center'>{record.specificGravity}</td>
              <td className='text-center'>{record.glucose}</td>
              <td className='text-center'>{record.protein}</td>
              <td className='text-center'>{record.ketones}</td>
              <td className='text-center'>{record.nitrites}</td>
              <td className='text-center'>{record.leucocytesEsterases}</td>
              <td className='text-center'>{record.blood}</td>
              <td className='text-center'>{record.bilirubin}</td>
              <td className='text-center'>{record.urobilinogen}</td>
              <td className='text-center'>{record.rbc}</td>
              <td className='text-center'>{record.wbc}</td>
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

export default UrinalysisScreen;
